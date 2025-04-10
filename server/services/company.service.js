const { Company, User, IndustrySkill } = require("../models");
const { ForbiddenError, NotFoundError } = require("../core/error.response");
const { formatLocations } = require("../utils/format");

class CompanyService {
  async updateCompany(companyId, recruiterId, updateData) {
    const company = await Company.findById(companyId);
    if (!company) {
      throw new NotFoundError("Company not found!");
    }

    const recruiter = await User.findOne({ _id: recruiterId, companyId });
    if (!recruiter) {
      throw new ForbiddenError(
        "You do not have permission to update this company."
      );
    }

    Object.assign(company, updateData);
    await company.save();

    if (recruiter.isFirstLogin) {
      recruiter.isFirstLogin = false;
      await recruiter.save();
    }

    return company;
  }

  async getCompanies() {
    const companies = await Company.find()
      .select("name description logo background_image locations industry_id")
      .populate("industry_id", "title");

    return companies.map((company) => {
      const { locations, industry_id, ...rest } = company.toObject();
      return {
        ...rest,
        location: formatLocations(locations),
        industry: industry_id?.title || "",
      };
    });
  }

  async getCompanyById(id) {
    const company = await Company.findById(id).select("-__v").lean();
    if (!company) return null;

    if (company.industry_id) {
      const industry = await IndustrySkill.findById(company.industry_id).select(
        "title"
      );
      company.industry = industry ? industry.title : null;
    }

    delete company.industry_id;
    return company;
  }
}

module.exports = new CompanyService();

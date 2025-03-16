const { Company, User, IndustrySkill } = require("../models");
const { ForbiddenError, NotFoundError } = require("../core/error.response");

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

    return company;
  }

  async getCompanies() {
    return await Company.find().select(
      "name description logo background_image"
    );
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

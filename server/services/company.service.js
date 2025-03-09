const { Company, User } = require("../models");
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
}

module.exports = new CompanyService();

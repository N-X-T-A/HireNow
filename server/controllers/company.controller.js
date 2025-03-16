const { OK } = require("../core/success.response");
const companyService = require("../services/company.service");
const { Company } = require("../models");

class CompanyController {
  updateCompany = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const recruiterId = req.user._id;
      console.log(recruiterId);

      const updatedCompany = await companyService.updateCompany(
        id,
        recruiterId,
        req.body
      );

      return new OK({
        message: "Company information updated successfully!",
        metadata: updatedCompany,
      }).send(res);
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
      });
    }
  };

  getCompanies = async (req, res) => {
    try {
      const companies = await companyService.getCompanies();
      return new OK({
        message: "Company list retrieved successfully!",
        metadata: companies,
      }).send(res);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getCompanyById = async (req, res) => {
    try {
      const { id } = req.params;
      const company = await companyService.getCompanyById(id);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      return new OK({
        message: "Company details retrieved successfully!",
        metadata: company,
      }).send(res);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

module.exports = new CompanyController();

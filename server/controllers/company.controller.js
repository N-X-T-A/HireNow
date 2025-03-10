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
}

module.exports = new CompanyController();

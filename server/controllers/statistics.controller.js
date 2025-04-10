const { Statistics } = require("../models");

const StatisticsController = {
  async getCompanyStatistics(req, res) {
    try {
      const stats = await Statistics.findOne({ companyId: req.user.companyId });

      if (!stats) {
        return res
          .status(404)
          .json({ message: "No statistics found for this company." });
      }

      res.status(200).json({
        message: "Statistics fetched successfully.",
        metadata: stats,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
};

module.exports = StatisticsController;

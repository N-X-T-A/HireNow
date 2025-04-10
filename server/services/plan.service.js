const { Plan } = require("../models");

const PlanService = {
  async getAllPlans() {
    return await Plan.find().sort({ price: 1 });
  },

  async getPlanBySlug(slugId) {
    return await Plan.findOne({ slugId });
  },
};

module.exports = PlanService;

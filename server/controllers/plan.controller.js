const PlanService = require("../services/plan.service");

const PlanController = {
  async getAll(req, res) {
    try {
      const plans = await PlanService.getAllPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch plans", error });
    }
  },

  async getPlanBySlug(req, res) {
    try {
      const { slugId } = req.params;
      const plan = await PlanService.getPlanBySlug(slugId);
      if (!plan) return res.status(404).json({ message: "Plan not found" });
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Error fetching plan", error });
    }
  },
};

module.exports = PlanController;

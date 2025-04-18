import { Plan } from "#model/plan.js";

export const PlanResource = {
  resource: Plan,
  options: {
    listProperties: ["name", "isPopular"],
    filterProperties: ["name", "price", "isPopular", "features"],
    editProperties: ["name", "price", "isPopular", "features"],
    showProperties: ["name", "price", "isPopular", "features"],
    actions: {
      edit: {
        before: async (request) => {
          if (
            request.payload?.isPopular === true ||
            request.payload?.isPopular === "true"
          ) {
            await Plan.updateMany({}, { $set: { isPopular: false } });
          }
          return request;
        },
      },
      new: {
        before: async (request) => {
          if (
            request.payload?.isPopular === true ||
            request.payload?.isPopular === "true"
          ) {
            await Plan.updateMany({}, { $set: { isPopular: false } });
          }
          return request;
        },
      },
    },
  },
};

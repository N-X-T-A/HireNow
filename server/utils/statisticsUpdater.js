const moment = require("moment");
const { Statistics } = require("../models");

const updateJobStatistics = async (companyId, actionType) => {
  try {
    moment.locale("en");

    const now = moment();
    const month = now.format("MMM");
    const quarter = `Q${now.quarter()}`;
    const year = now.format("YYYY");

    let stats = await Statistics.findOne({ companyId });

    if (!stats) {
      stats = new Statistics({
        companyId,
        monthly: {
          categories: [],
          series: [
            { name: "Jobs Posted", data: [] },
            { name: "Applications", data: [] },
          ],
        },
        quarterly: {
          categories: [],
          series: [
            { name: "Jobs Posted", data: [] },
            { name: "Applications", data: [] },
          ],
        },
        annually: {
          categories: [],
          series: [
            { name: "Jobs Posted", data: [] },
            { name: "Applications", data: [] },
          ],
        },
      });
    }

    const updateCategory = (scope, categoryLabel, actionType) => {
      const catIndex = stats[scope].categories.indexOf(categoryLabel);
      if (catIndex === -1) {
        stats[scope].categories.push(categoryLabel);
        if (actionType === "createJob") {
          stats[scope].series[0].data.push(1);
          stats[scope].series[1].data.push(0);
        } else if (actionType === "applyForJob") {
          stats[scope].series[0].data.push(0);
          stats[scope].series[1].data.push(1);
        }
      } else {
        if (actionType === "createJob") {
          stats[scope].series[0].data[catIndex] += 1;
        } else if (actionType === "applyForJob") {
          stats[scope].series[1].data[catIndex] += 1;
        }
      }
    };

    updateCategory("monthly", month, actionType);
    updateCategory("quarterly", quarter, actionType);
    updateCategory("annually", year, actionType);

    await stats.save();
  } catch (error) {
    console.error("Error updating job statistics:", error);
  }
};

module.exports = { updateJobStatistics };

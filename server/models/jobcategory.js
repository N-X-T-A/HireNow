"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobCategory extends Model {
    static associate(models) {
      this.hasMany(models.JobListing, {
        foreignKey: "categoryId",
        as: "jobListings",
      }); // Quan hệ 1-N với JobListing
    }
  }
  JobCategory.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: "JobCategory" }
  );
  return JobCategory;
};

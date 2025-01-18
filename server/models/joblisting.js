"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobListing extends Model {
    static associate(models) {
      this.belongsTo(models.Company, {
        foreignKey: "companyId",
        as: "company",
      }); // Quan hệ N-1 với Company
      this.belongsTo(models.JobCategory, {
        foreignKey: "categoryId",
        as: "category",
      }); // Quan hệ N-1 với JobCategory
      this.hasMany(models.Application, {
        foreignKey: "jobId",
        as: "applications",
      }); // Quan hệ 1-N với Application
      this.belongsToMany(models.Skill, {
        through: models.JobSkill,
        foreignKey: "jobId",
        as: "skills",
      }); // Quan hệ N-N với Skill qua JobSkill
    }
  }
  JobListing.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      requirements: DataTypes.TEXT,
      salaryRange: DataTypes.STRING,
      location: DataTypes.STRING,
      companyId: { type: DataTypes.INTEGER, allowNull: false },
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
      expiryDate: DataTypes.DATE,
    },
    { sequelize, modelName: "JobListing" }
  );
  return JobListing;
};

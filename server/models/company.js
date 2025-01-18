"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" }); // Quan hệ N-1 với User
      this.hasMany(models.JobListing, {
        foreignKey: "companyId",
        as: "jobListings",
      }); // Quan hệ 1-N với JobListing
    }
  }
  Company.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      industry: DataTypes.STRING,
      description: DataTypes.TEXT,
      website: DataTypes.STRING,
      logoURL: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, modelName: "Company" }
  );
  return Company;
};

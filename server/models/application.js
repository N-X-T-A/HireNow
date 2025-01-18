"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" }); // Quan hệ N-1 với User
      this.belongsTo(models.JobListing, {
        foreignKey: "jobId",
        as: "jobListing",
      }); // Quan hệ N-1 với JobListing
    }
  }
  Application.init(
    {
      jobId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      coverLetter: DataTypes.TEXT,
      status: {
        type: DataTypes.ENUM("Pending", "Reviewed", "Accepted", "Rejected"),
        defaultValue: "Pending",
      },
    },
    { sequelize, modelName: "Application" }
  );
  return Application;
};

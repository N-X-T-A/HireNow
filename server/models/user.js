"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Profile, { foreignKey: "userId", as: "profile" }); // Quan hệ 1-1 với Profile
      this.hasMany(models.Application, {
        foreignKey: "userId",
        as: "applications",
      }); // Quan hệ 1-N với Application
      this.hasMany(models.Company, { foreignKey: "userId", as: "companies" }); // Quan hệ 1-N với Company
      this.belongsToMany(models.Skill, {
        through: models.UserSkill,
        foreignKey: "userId",
        as: "skills",
      }); // Quan hệ N-N với Skill qua UserSkill
    }
  }
  User.init(
    {
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.ENUM("Applicant", "Employer", "Admin"),
        allowNull: false,
      },
    },
    { sequelize, modelName: "User" }
  );
  return User;
};

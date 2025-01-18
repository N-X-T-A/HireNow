"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.UserSkill,
        foreignKey: "skillId",
        as: "users",
      }); // Quan hệ N-N với User qua UserSkill
      this.belongsToMany(models.JobListing, {
        through: models.JobSkill,
        foreignKey: "skillId",
        as: "jobListings",
      }); // Quan hệ N-N với JobListing qua JobSkill
    }
  }
  Skill.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    { sequelize, modelName: "Skill" }
  );
  return Skill;
};

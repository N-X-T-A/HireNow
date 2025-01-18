"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserSkill extends Model {
    static associate(models) {}
  }
  UserSkill.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      skillId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, modelName: "UserSkill" }
  );
  return UserSkill;
};

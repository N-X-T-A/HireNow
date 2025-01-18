"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobSkill extends Model {
    static associate(models) {}
  }
  JobSkill.init(
    {
      jobId: { type: DataTypes.INTEGER, allowNull: false },
      skillId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, modelName: "JobSkill" }
  );
  return JobSkill;
};

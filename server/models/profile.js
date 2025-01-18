"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" }); // Quan hệ 1-1 với User
    }
  }
  Profile.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      fullName: { type: DataTypes.STRING, allowNull: false },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.TEXT,
      summary: DataTypes.TEXT,
      resumeURL: DataTypes.STRING,
    },
    { sequelize, modelName: "Profile" }
  );
  return Profile;
};

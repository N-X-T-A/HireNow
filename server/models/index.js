"use strict";

const User = require("./user.model");
const Company = require("./company.model");
const Job = require("./job.model");
const Application = require("./application.model");
const Message = require("./message.model");
const Skill = require("./skill.model");
const UserSkill = require("./userSkill.model");
const UserExperience = require("./userExperience.model");
const UserEducation = require("./userEducation.model");

module.exports = {
  User,
  Company,
  Job,
  Application,
  Message,
  Skill,
  UserSkill,
  UserExperience,
  UserEducation,
};

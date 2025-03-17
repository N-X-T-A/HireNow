"use strict";

const moment = require("moment");
require("moment/locale/vi");

const calculatePostedTime = (posted_date) => {
  return moment(posted_date).fromNow();
};

const formatLocations = (locations) => {
  if (!locations || !locations.length) return "";

  const uniqueCities = [...new Set(locations.map((loc) => loc.city))];

  return uniqueCities.length === 1 ? uniqueCities[0] : uniqueCities.join(" - ");
};

module.exports = {
  calculatePostedTime,
  formatLocations,
};

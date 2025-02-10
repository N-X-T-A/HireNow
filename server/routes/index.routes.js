var express = require("express");
var router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "authorization, Origin, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

router.use("/v1/auth", require("./auth.routes"));
router.use("/v1/joblistings", require("./joblistings.routes"));
module.exports = router;

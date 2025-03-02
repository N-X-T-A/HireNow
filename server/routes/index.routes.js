const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "authorization, Origin, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

router.use("/api/v1/auth", require("./auth.routes"));
router.use("/api/v1/user", require("./user.routes"));
router.use("/api/v1/job", require("./job.routes"));

module.exports = router;

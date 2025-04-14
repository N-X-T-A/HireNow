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

router.get("/", (req, res) => {
  res.send("<h2>Hello World</h2>");
});

router.use("/api/v1/auth", require("./auth.routes"));
router.use("/api/v1/user", require("./user.routes"));
router.use("/api/v1/job", require("./job.routes"));
router.use("/api/v1/upload", require("./upload.routes"));
router.use("/api/v1/application", require("./application.routes"));
router.use("/api/v1/favorite", require("./favorite.routes"));
router.use("/api/v1/company", require("./company.routes"));
router.use("/api/v1/chat", require("./chat.routes"));
router.use("/api/v1/blog", require("./blog.routes"));
router.use("/api/v1/payment", require("./payment.routes"));
router.use("/api/v1/plans", require("./plan.routes"));
router.use("/api/v1/statistics", require("./statistics.routes"));

module.exports = router;

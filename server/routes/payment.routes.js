const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/payment.controller");
const asyncHandler = require("express-async-handler");

// router.post("/zalopay", asyncHandler(PaymentController.processZaloPay));

router.post("/confirm", asyncHandler(PaymentController.confirmPayment));
router.post("/upgradePackage", asyncHandler(PaymentController.upgradePackage));
router.post("/refundPayment", asyncHandler(PaymentController.refundPayment));

module.exports = router;

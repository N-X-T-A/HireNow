const paypal = require("../config/paypal.config");
const { Payment, Company } = require("../models");

class PaymentController {
  async confirmPayment(req, res) {
    try {
      const { companyId, amount, servicePackage, paymentDetails } = req.body;

      const paymentRecord = new Payment({
        company_id: companyId,
        amount,
        paymentMethod: "paypal",
        paymentStatus: "completed",
        servicePackage,
        orderId: paymentDetails?.id,
      });

      await paymentRecord.save();

      const company = await Company.findById(companyId);
      if (company) {
        company.servicePackage = servicePackage;
        await company.save();
      }

      res.json({ message: "Payment confirmed and saved successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error confirming payment" });
    }
  }

  async upgradePackage(req, res) {
    try {
      const { companyId, newPackage } = req.body;

      const company = await Company.findById(companyId);
      if (!company)
        return res.status(404).json({ message: "Company not found" });

      const current = company.servicePackage || "basic";
      const priceCurrent = PACKAGES[current].price;
      const priceNew = PACKAGES[newPackage].price;

      const difference = priceNew - priceCurrent;

      if (difference === 0) {
        return res.json({ message: "You are already on this package." });
      }

      if (difference > 0) {
        return res.json({
          action: "charge",
          amountToPay: difference,
          from: current,
          to: newPackage,
        });
      }

      return res.json({
        action: "refund",
        amountToRefund: -difference,
        from: current,
        to: newPackage,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Upgrade check failed" });
    }
  }

  async refundPayment(req, res) {
    const { paymentId, refundAmount } = req.body;

    paypal.sale.refund(
      paymentId,
      {
        amount: {
          total: refundAmount,
          currency: "USD",
        },
      },
      (error, refund) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Refund failed" });
        }
        res.json({ message: "Refund successful", refund });
      }
    );
  }
}

module.exports = new PaymentController();

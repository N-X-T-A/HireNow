const axios = require("axios");
const qs = require("qs");

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const baseUrl = "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
  const response = await axios.post(
    `${baseUrl}/v1/oauth2/token`,
    qs.stringify({ grant_type: "client_credentials" }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
    }
  );

  return response.data.access_token;
}

async function refundPayment(captureId, refundAmount) {
  const accessToken = await getAccessToken();

  const response = await axios.post(
    `${baseUrl}/v2/payments/captures/${captureId}/refund`,
    {
      amount: {
        value: refundAmount.toFixed(2),
        currency_code: "USD",
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}

module.exports = {
  refundPayment,
};

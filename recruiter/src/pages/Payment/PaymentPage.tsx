import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Alert from "../../components/ui/alert/Alert";
import { SERVICE_URL } from "../../api/config";

interface Plan {
  name: string;
  price: number;
  features: string[];
  label?: string;
  slugId: string;
}

export default function PaymentPage() {
  const { slugId } = useParams<{ slugId: string }>();
  const navigate = useNavigate();

  const companyId = localStorage.getItem("companyId");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "error" | null
  >(null);

  useEffect(() => {
    if (slugId) {
      fetch(`${SERVICE_URL}/plans/${slugId}`)
        .then((res) => {
          if (res.status === 404) {
            navigate("*");
            return null;
          }
          if (!res.ok) throw new Error("Failed to fetch plan details");
          return res.json();
        })
        .then((data) => {
          if (data) setPlan(data);
        })
        .catch((err) => {
          navigate("/not-found");
        });
    }
  }, [slugId]);

  const price = plan?.price || 0;

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AT4Vph0BReDzO9Nt-xD-mkYtMDe9-lrEMC51-_umkaxN2-2QJA9qWjGDOD8Z94PjxZjJfnsGpCMDVUJ4",
        currency: "USD",
      }}
    >
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-[100px] bg-white rounded-xl shadow-md p-8">
          {plan && (
            <div className={`border-l-4 border-blue-500 pl-6`}>
              <h2 className="text-2xl font-bold mb-4">
                {plan.name.charAt(0).toUpperCase() + plan.name.slice(1)} Plan
              </h2>
              <ul className="text-gray-700 space-y-2 text-base mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-gray-800 text-base space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${price} USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$0.00 USD</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-blue-600">
                  <span>Total due today</span>
                  <span>${price} USD</span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
            <div className="border rounded-md p-4 bg-white shadow-sm space-y-4">
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order?.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: price.toString(),
                        },
                        description: `Payment for ${plan?.name} package`,
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  if (actions.order) {
                    const details = await actions.order.capture();
                    setPaymentStatus("success");

                    await fetch(`${SERVICE_URL}/payment/confirm`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        companyId,
                        amount: price,
                        servicePackage: plan?.slugId,
                        paymentDetails: details,
                      }),
                    });

                    setTimeout(() => navigate("/"), 2000);
                  }
                }}
                onError={() => setPaymentStatus("error")}
              />
            </div>

            <div className="mt-6">
              {paymentStatus === "success" && (
                <Alert
                  variant="success"
                  title="Payment successful"
                  message="You will be redirected shortly..."
                />
              )}
              {paymentStatus === "error" && (
                <Alert
                  variant="error"
                  title="Payment failed"
                  message="Something went wrong. Please try again."
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Alert from "../../components/ui/alert/Alert";
import { SERVICE_URL } from "../../api/config";

interface Plan {
  name: string;
  price: number;
  features: string[];
  label?: string;
  slugId: string;
}

interface Metadata {
  servicePackage: string | null;
}

interface ServicePackage {
  metadata: Metadata;
}

export default function ServicePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentPackage, setCurrentPackage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${SERVICE_URL}/plans`);
        if (!res.ok) throw new Error("Failed to fetch plans");
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Unable to load plans. Please try again later.");
      }
    };

    const fetchCompanyData = async () => {
      const recruiter = localStorage.getItem("recruiter");
      if (recruiter) {
        const recruiterData = JSON.parse(recruiter);
        const companyId = recruiterData.companyId;
        localStorage.setItem("companyId", companyId._id);

        try {
          const res = await fetch(`${SERVICE_URL}/company/${companyId._id}`);
          if (!res.ok) throw new Error("Failed to fetch company data");
          const data: ServicePackage = await res.json();
          setCurrentPackage(data.metadata.servicePackage);
        } catch (err) {
          console.error("Error fetching company data:", err);
          setError("Unable to load your current service package.");
        }
      }
    };

    fetchPlans();
    fetchCompanyData();
  }, []);

  const handleSelect = (plan: Plan): void => {
    navigate(`/payment/${plan.slugId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-screen-xl w-full">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Choose a Service Plan
        </h2>

        {error && (
          <div className="mb-6">
            <Alert variant="error" title="Error" message={error} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map((plan) => {
            const isCurrent = plan.name === currentPackage;

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col min-h-[560px] border rounded-3xl p-8 shadow-lg hover:shadow-2xl transition cursor-pointer bg-white ${
                  isCurrent ? "border-blue-500 ring-2 ring-blue-300" : ""
                }`}
                onClick={() => handleSelect(plan)}
              >
                {plan.label && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white text-sm px-4 py-1 rounded-full">
                    {plan.label}
                  </div>
                )}
                <h3 className="text-2xl font-bold capitalize mb-4 text-gray-900">
                  {plan.name.charAt(0).toUpperCase() + plan.name.slice(1)} Plan
                </h3>

                <p className="text-4xl font-extrabold text-gray-800 mb-6">
                  ${plan.price}
                  <span className="text-lg text-gray-500 font-medium">
                    {" "}
                    /month
                  </span>
                </p>
                <ul className="mb-8 space-y-4 text-lg text-gray-700">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-3 text-xl">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-auto py-3 text-lg rounded-xl font-bold text-white transition ${
                    isCurrent
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  disabled={isCurrent}
                >
                  {isCurrent
                    ? "Current Plan"
                    : currentPackage !== "none"
                    ? "Switch to this plan"
                    : "Select This Plan"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// components/common/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [requiresPlan, setRequiresPlan] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const companyInfo = localStorage.getItem("companyInfo");

    if (!token || !companyInfo) {
      setAuthChecked(true);
      return;
    }

    try {
      const data = JSON.parse(companyInfo);
      const now = new Date();
      const planExpired =
        data.servicePackage === "none" ||
        (data.planExpiresAt && new Date(data.planExpiresAt) < now);

      setIsAuthorized(true);
      setRequiresPlan(planExpired);
    } catch (err) {
      console.error("Failed to parse companyInfo:", err);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("companyInfo");
    } finally {
      setAuthChecked(true);
    }
  }, []);

  if (!authChecked) return null;

  if (!isAuthorized) return <Navigate to="/signin" replace />;
  if (requiresPlan) return <Navigate to="/plans" replace />;

  return <Outlet />;
}

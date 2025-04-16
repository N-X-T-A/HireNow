import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const [authChecked, setAuthChecked] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const recruiterData = localStorage.getItem("recruiter");
    const isFirstLogin = localStorage.getItem("isFirstLogin") === "true";

    if (!token || !recruiterData) {
      setRedirectTo("/signin");
      setAuthChecked(true);
      return;
    }

    try {
      const data = JSON.parse(recruiterData);
      const now = new Date();
      const planExpired =
        data.servicePackage === "none" ||
        (data.planExpiresAt && new Date(data.planExpiresAt) < now);

      if (isFirstLogin) {
        setRedirectTo("/first-login");
      } else if (planExpired) {
        setRedirectTo("/plans");
      } else {
        setRedirectTo(null);
      }
    } catch (err) {
      console.error("Failed to parse recruiter data:", err);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("recruiter");
      localStorage.removeItem("isFirstLogin");
      setRedirectTo("/signin");
    } finally {
      setAuthChecked(true);
    }
  }, []);

  if (!authChecked) return null;

  if (redirectTo) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
}

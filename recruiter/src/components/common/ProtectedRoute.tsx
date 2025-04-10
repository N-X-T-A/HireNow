// components/common/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [requiresPlan, setRequiresPlan] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return setAuthChecked(true);

      try {
        const res = await fetch("http://localhost:5000/api/v1/company/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("accessToken");
          return setAuthChecked(true);
        }

        const data = await res.json();
        const now = new Date();
        const planExpired =
          data.servicePackage === "none" ||
          (data.planExpiresAt && new Date(data.planExpiresAt) < now);

        setIsAuthorized(true);
        setRequiresPlan(planExpired);
      } catch (err) {
        console.error(err);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  if (!authChecked) return null;

  if (!isAuthorized) return <Navigate to="/signin" replace />;
  if (requiresPlan) return <Navigate to="/plans" replace />;

  return <Outlet />;
}

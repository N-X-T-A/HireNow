import { JSX } from "react";
import { Navigate } from "react-router";

const FirstLoginRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const isFirstLogin = localStorage.getItem("isFirstLogin") === "true";
  const isLoggedIn = localStorage.getItem("accessToken") !== null;

  if (!isLoggedIn) return <Navigate to="/signin" replace />;
  if (!isFirstLogin) return <Navigate to="/" replace />;

  return element;
};

export default FirstLoginRoute;

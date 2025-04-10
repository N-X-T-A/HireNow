import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "../../utils/auth";

const AuthRedirectRoute: React.FC = () => {
  return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRedirectRoute;

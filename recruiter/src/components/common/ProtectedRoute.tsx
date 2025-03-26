import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "../../utils/auth";

const ProtectedRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;

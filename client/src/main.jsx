import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Login from "./pages/Access/Login";
import UserManager from "./pages/User/UserManager";
import "bootstrap/dist/css/bootstrap.min.css";
import { Environment } from "./environments/Environment";
import UserPage1 from "./pages/User/UserPage1";
import UserPage2 from "./pages/User/UserPage2";
import UserPage3 from "./pages/User/UserPage3";
import PrivateRoute from "./layout/PrivateRoute";
import EmployerManager from "./pages/employer/employerManager";
import EmployerPage1 from "./pages/employer/employerPage1";
import JobDetailPage from "./pages/User/jobDetailPage";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* public route */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />

        {/* Private Employee route */}
        <Route element={<PrivateRoute allowedRoles={["candidate"]} />}>
          <Route path="/User/*" element={<UserManager />}>
            <Route path="UserHome" element={<UserPage1 />} />
            <Route path="Jobs" element={<UserPage2 />} />
            <Route path="Test" element={<UserPage3 />} />
            <Route path="Jobs/:Id" element={<JobDetailPage />} />
          </Route>
        </Route>

        {/* Route dành cho Employer  */}
        <Route element={<PrivateRoute allowedRoles={[, "recruiter"]} />}>
          <Route path="/employer/*" element={<EmployerManager />}>
            <Route path="page1" element={<EmployerPage1 />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);

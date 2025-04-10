import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import JobForm from "./pages/JobForm";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ApplicantsTables from "./pages/Tables/ApplicantsTables";
import JoblistingTables from "./pages/Tables/JobListingTables";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Chats from "./pages/Chat";
import PaymentPage from "./pages/Payment/PaymentPage";
import ServicePlans from "./pages/Payment/ServicePlans";
import FirstLogin from "./pages/AuthPages/FirstLogin";
import AuthRedirectRoute from "./components/common/AuthRedirectRoute";
import FirstLoginRoute from "./components/common/FirstLoginRoute";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<ProtectedRoute />}>
            {/* Dashboard Layout */}
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/post-new-job" element={<JobForm />} />
              <Route path="/applicants" element={<ApplicantsTables />} />
              <Route path="/job-listing" element={<JoblistingTables />} />
              <Route path="/chat" element={<Chats />} />
            </Route>
            <Route path="/plans" element={<ServicePlans />} />
            <Route path="/payment/:slugId" element={<PaymentPage />} />
          </Route>
          {/* Auth Layout */}
          <Route element={<AuthRedirectRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route
            path="/first-login"
            element={<FirstLoginRoute element={<FirstLogin />} />}
          />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./layout/ScrollToTop";

import Home from "./pages/Home";
import Test from "./pages/Test";
import Login from "./pages/Access/Login";
import Register from "./pages/Access/register";
import RegisterRecruiter from "./pages/Access/registerRecruiter";
import EmployerIntro from "./pages/employerIntro";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./pages/NotFound";

import PrivateRoute from "./layout/PrivateRoute";
import UserManager from "./pages/User/UserManager";
import UserPage1 from "./pages/User/UserPage1";
import UserPage2 from "./pages/User/UserPage2";
import UserPage3 from "./pages/User/UserPage3";
import JobDetailPage from "./pages/User/jobDetailPage";
import UserProfile from "./pages/User/userProfile";
import { ShowProfile } from "./pages/User/showProfile";
import ShowCompanieProfile from "./pages/User/showCompanieProfile";
import JobApply from "./pages/User/jobApply";

import EmployerManager from "./pages/employer/employerManager";
import EmployerPage1 from "./pages/employer/employerPage1";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-recruiter" element={<RegisterRecruiter />} />
        <Route path="/Recruiter-introduction" element={<EmployerIntro />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="*" element={<NotFound />} />

        {/* Private Employee Routes */}
        <Route element={<PrivateRoute allowedRoles={["candidate"]} />}>
          <Route path="/user/*" element={<UserManager />}>
            <Route path="userHome" element={<UserPage1 />} />
            <Route path="jobs" element={<UserPage2 />} />
            <Route path="chat" element={<UserPage3 />} />
            <Route path="jobs/:jobId" element={<JobDetailPage />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="profile-user" element={<ShowProfile />} />
            <Route path="company/:ComId" element={<ShowCompanieProfile />} />
            <Route path="job-apply" element={<JobApply />} />
          </Route>
        </Route>

        {/* Private Employer Routes */}
        <Route element={<PrivateRoute allowedRoles={["recruiter"]} />}>
          <Route path="/employer/*" element={<EmployerManager />}>
            <Route path="page1" element={<EmployerPage1 />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

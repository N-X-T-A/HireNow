import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Environment } from "./environments/Environment";
const CLIENT_ID = Environment.GG_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </StrictMode>
  </GoogleOAuthProvider>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  </StrictMode>
);

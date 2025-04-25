import { Routes, Route } from "react-router-dom";

import Home from "./page/home";
import DetailJob from "./page/DetailJob";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/:jobId" element={<DetailJob />} />
      </Routes>
    </>
  );
}

export default App;

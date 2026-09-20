import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoanApplicationPage from "../pages/LoanApplication/LoanApplicationPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import ResumePage from "../pages/Resume/ResumePage";
import SuccessPage from "../pages/Success/SuccessPage";

import MyApplications from "../pages/MyApplications/MyApplications";
import Documents from "../pages/Documents/Documents";
import Profile from "../pages/Profile/Profile";
import Support from "../pages/Support/Support";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoanApplicationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/success" element={<SuccessPage />} />

        <Route path="/applications" element={<MyApplications />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
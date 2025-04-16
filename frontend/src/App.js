import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Layout from "./Components/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Attendance from "./pages/Attendance";
import LeaveRequests from "./pages/LeaveRequests";
import Payroll from "./pages/Payroll";
import UserManager from "./Components/UserManager";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import LandingPage from "./Components/LandingPage";
import JobOffers from "./Components/features/JobOffers";
import JobApplicationForm from "./Components/features/jobApplicationForm";

// Protected route wrapper
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/features/job-offers" element={<JobOffers />} />
        <Route path="/jobApplication" element={<JobApplicationForm />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/leave-requests" element={<LeaveRequests />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/recruitment" element={<JobOffers />} />
            <Route path="/settings" element={<UserManager />} />
            <Route path="/usermanager" element={<UserManager />} />
            
            {/* Redirect any other authenticated route to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
        
        {/* Global catch-all - redirect to login page */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

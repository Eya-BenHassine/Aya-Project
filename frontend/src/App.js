import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import UserManager from "./Components/UserManager";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import LandingPage from "./Components/LandingPage";
import JobOffers from "./Components/features/JobOffers";
import JobApplicationForm from "./Components/features/jobApplicationForm";


const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Layout>{element}</Layout> : <Navigate to="/login" />;
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
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/employees"
          element={<ProtectedRoute element={<Employees />} />}
        />
        <Route
          path="/departments"
          element={<ProtectedRoute element={<Departments />} />}
        />
        <Route
          path="/usermanager"
          element={<ProtectedRoute element={<UserManager />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

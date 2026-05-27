import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StudentsAdmin from './pages/admin/StudentsAdmin';
import RecruitersAdmin from './pages/admin/RecruitersAdmin';
import CompaniesAdmin from './pages/admin/CompaniesAdmin';
import ChangePassword from './pages/ChangePassword';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardRedirect />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/change-password" element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        } />
        <Route path="/recruiter" element={
          <ProtectedRoute role="recruiter">
            <RecruiterDashboard />
          </ProtectedRoute>
        } />
        <Route path="/student" element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/students" element={
          <ProtectedRoute role="admin">
            <StudentsAdmin />
          </ProtectedRoute>
        } />
        <Route path="/admin/recruiters" element={
          <ProtectedRoute role="admin">
            <RecruitersAdmin />
          </ProtectedRoute>
        } />
        <Route path="/admin/companies" element={
          <ProtectedRoute role="admin">
            <CompaniesAdmin />
          </ProtectedRoute>
        } />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

function DashboardRedirect() {
  const user = localStorage.getItem('user');
  if (!user) return null;
  const parsed = JSON.parse(user);
  if (parsed.role === 'admin') window.location.href = '/admin';
  else if (parsed.role === 'recruiter') window.location.href = '/recruiter';
  else window.location.href = '/student';
  return null;
}
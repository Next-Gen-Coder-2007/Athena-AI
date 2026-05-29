import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="./logo.png"
              alt="Athena AI Logo"
              className="h-10 rounded"
            />
            <span className="text-xl font-bold text-gray-800">Athena AI</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`transition ${isActive('/') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Home
            </Link>
            <Link
              to="/features"
              className={`transition ${isActive('/features') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Features
            </Link>
            <Link
              to="/about"
              className={`transition ${isActive('/about') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`transition ${isActive('/contact') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {(() => {
              const stored = localStorage.getItem('user');
              if (stored) {
                try {
                  const u = JSON.parse(stored);
                  const path = u.role === 'admin' ? '/admin' : u.role === 'recruiter' ? '/recruiter' : '/student';
                  return (
                    <Link to={path} className="text-blue-600 hover:text-blue-700 transition">Dashboard</Link>
                  );
                } catch (e) {
                  // fallthrough
                }
              }
              return (
                <>
                  <Link to="/login" className="text-blue-600 hover:text-blue-700 transition">Login</Link>
                  <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">Get Started <FaArrowRight className="text-xs" /></Link>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
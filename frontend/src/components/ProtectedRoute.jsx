import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!user || !token) {
        return <Navigate to="/login" state={{ error: "Please log in to access this page." }} />;
    }

    if (role) {
        const parsed = JSON.parse(user);
        if (parsed.role !== role) {
            return <Navigate to="/dashboard" state={{ error: "Access denied." }} />;
        }
    }

    return children;
};

export default ProtectedRoute;
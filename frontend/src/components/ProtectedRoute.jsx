import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem("user");
    if (!user) {
        return <Navigate to="/login" state={{ error: "Please log in to access this page." }} />;
    }
    return children;
};

export default ProtectedRoute;
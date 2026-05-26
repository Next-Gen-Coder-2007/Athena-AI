import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaTachometerAlt, FaSignOutAlt, FaChartLine, FaCalendarAlt, FaCog } from 'react-icons/fa';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start pt-10 bg-gray-50">
            <div className="w-full max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-md shadow-sm border border-gray-200 hover:bg-gray-100 transition"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>

                {/* Welcome Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex items-center gap-6">
                    <FaUserCircle className="text-blue-600 text-6xl" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Welcome back, {user.name}!</h2>
                        <p className="text-gray-600">Here’s what’s happening with your account today.</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-4">
                        <button className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition">
                            <FaCog />
                            <span>Settings</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
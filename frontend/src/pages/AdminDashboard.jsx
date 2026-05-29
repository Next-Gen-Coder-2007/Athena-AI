import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    FaUserCircle, FaSignOutAlt, FaBriefcase, FaBell, FaSearch, FaPlus, FaTachometerAlt, FaCog, FaChartLine, FaEye
} from 'react-icons/fa';
import StudentsAdmin from './admin/StudentsAdmin';
import RecruitersAdmin from './admin/RecruitersAdmin';
import CompaniesAdmin from './admin/CompaniesAdmin';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [activeTab, setActiveTab] = useState('overview');
    const [jobs, setJobs] = useState([
        { id: 1, title: 'Software Engineer', company: 'Tech Corp', status: 'Open', date: '2023-11-15' },
    ]);
    const [notifications, setNotifications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Admin stats removed to keep dashboard minimal and professional

    const getStatusColor = (status) => {
        switch(status.toLowerCase()) {
            case 'applied': return 'bg-blue-100 text-blue-800';
            case 'interview': return 'bg-yellow-100 text-yellow-800';
            case 'offer': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <img src="./logo.png" alt="Logo" className="h-10 rounded" />
                                <span className="text-xl font-bold text-gray-800">Athena AI - Admin</span>
                            </div>
                            <div className="relative hidden md:block">
                                <input
                                    type="text"
                                    placeholder="Search students, recruiters..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                                    <FaBell className="text-gray-600 text-xl" />
                                    {notifications.filter(n => !n.read).length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {notifications.filter(n => !n.read).length}
                                        </span>
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="hidden md:flex items-center gap-2">
                                    <FaUserCircle className="text-blue-600 text-2xl" />
                                    <div>
                                        <p className="font-medium text-gray-800">{user?.name}</p>
                                        <p className="text-sm text-gray-500">{user?.role || 'Admin'}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-md shadow-sm border border-gray-200 hover:bg-gray-100 transition"
                                >
                                    <FaSignOutAlt />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div className="flex items-center gap-4 mb-6">
                                <FaUserCircle className="text-blue-600 text-4xl" />
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                                    <p className="text-gray-600">{user?.email}</p>
                                </div>
                            </div>
                            <nav className="space-y-2">
                                {[
                                    { id: 'overview', label: 'Overview', icon: <FaTachometerAlt /> },
                                    { id: 'students', label: 'Students', icon: <FaUserCircle /> },
                                    { id: 'recruiters', label: 'Recruiters', icon: <FaBriefcase /> },
                                    { id: 'companies', label: 'Companies', icon: <FaChartLine /> },
                                    { id: 'settings', label: 'Settings', icon: <FaCog /> },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Removed default stats cards to streamline Admin view */}

                        <div className="bg-white rounded-lg shadow-md p-6">
                            {activeTab === 'overview' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">Dashboard Overview</h2>
                                        <Link to="/admin/students" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                                            <FaPlus /> Manage Students
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Jobs</h3>
                                            <div className="space-y-4">
                                                {jobs.slice(0, 3).map(job => (
                                                    <div key={job.id} className="p-4 border border-gray-200 rounded-lg">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h4 className="font-medium text-gray-800">{job.title}</h4>
                                                                <p className="text-sm text-gray-500">{job.company}</p>
                                                            </div>
                                                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(job.status)}`}>
                                                                {job.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-500 mt-2">{job.date}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                                            <div className="space-y-3">
                                                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                                                    <span>View Students</span>
                                                    <FaEye className="text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'students' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Students</h2>
                                    <StudentsAdmin />
                                </div>
                            )}

                            {activeTab === 'recruiters' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Recruiters</h2>
                                    <RecruitersAdmin />
                                </div>
                            )}

                            {activeTab === 'companies' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Companies</h2>
                                    <CompaniesAdmin />
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Settings</h2>
                                    <p>Admin settings and preferences.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

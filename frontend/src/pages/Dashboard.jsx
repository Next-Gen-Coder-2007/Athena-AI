import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUserCircle, FaSignOutAlt, FaChartLine, FaCalendarAlt, FaCog,
  FaBriefcase, FaFileAlt, FaBell, FaSearch, FaPlus, FaEdit,
  FaTrash, FaEye, FaFilter, FaSort, FaDownload, FaTachometerAlt
} from 'react-icons/fa';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [activeTab, setActiveTab] = useState('overview');
    const [jobs, setJobs] = useState([
        { id: 1, title: 'Software Engineer', company: 'Tech Corp', status: 'Applied', date: '2023-11-15' },
        { id: 2, title: 'Data Scientist', company: 'AI Solutions', status: 'Interview', date: '2023-11-10' },
        { id: 3, title: 'Frontend Developer', company: 'Web Studio', status: 'Offer', date: '2023-11-05' },
    ]);
    const [applications, setApplications] = useState([
        { id: 1, student: 'John Doe', job: 'Software Engineer', status: 'Reviewed', date: '2023-11-12' },
        { id: 2, student: 'Jane Smith', job: 'Data Analyst', status: 'Shortlisted', date: '2023-11-08' },
    ]);
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'New job posting: Software Engineer at Tech Corp', time: '2 hours ago', read: false },
        { id: 2, message: 'Your application for Data Scientist was reviewed', time: '1 day ago', read: true },
    ]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const logout = () => {
        localStorage.removeItem("user");
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

    const filteredApplications = applications.filter(app =>
        app.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch(status.toLowerCase()) {
            case 'applied': return 'bg-blue-100 text-blue-800';
            case 'interview': return 'bg-yellow-100 text-yellow-800';
            case 'offer': return 'bg-green-100 text-green-800';
            case 'reviewed': return 'bg-purple-100 text-purple-800';
            case 'shortlisted': return 'bg-indigo-100 text-indigo-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const stats = [
        { label: 'Total Applications', value: '12', icon: <FaFileAlt />, color: 'blue' },
        { label: 'Jobs Applied', value: '8', icon: <FaBriefcase />, color: 'green' },
        { label: 'Interviews', value: '3', icon: <FaCalendarAlt />, color: 'yellow' },
        { label: 'Offers Received', value: '2', icon: <FaChartLine />, color: 'purple' },
    ];

    // Toggle switch component
    const ToggleSwitch = ({ checked, onChange }) => {
        return (
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={checked}
                    onChange={onChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                </div>
            </label>
        );
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
                                <span className="text-xl font-bold text-gray-800">Athena AI</span>
                            </div>
                            <div className="relative hidden md:block">
                                <input
                                    type="text"
                                    placeholder="Search jobs, applications..."
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
                                        <p className="text-sm text-gray-500">{user?.role || 'Student'}</p>
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
                                    { id: 'jobs', label: 'Job Listings', icon: <FaBriefcase /> },
                                    { id: 'applications', label: 'My Applications', icon: <FaFileAlt /> },
                                    { id: 'calendar', label: 'Interview Schedule', icon: <FaCalendarAlt /> },
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
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                                            <span className={`text-${stat.color}-600 text-xl`}>{stat.icon}</span>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                            <p className="text-sm text-gray-500">{stat.label}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Content based on active tab */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            {activeTab === 'overview' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">Dashboard Overview</h2>
                                        <Link to="/resume-upload" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                                            <FaPlus /> Upload Resume
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
                                                    <span>Update Profile</span>
                                                    <FaEdit className="text-gray-400" />
                                                </button>
                                                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                                                    <span>View Resume Feedback</span>
                                                    <FaEye className="text-gray-400" />
                                                </button>
                                                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                                                    <span>Interview Preparation</span>
                                                    <FaCalendarAlt className="text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'jobs' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">Job Listings</h2>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                                                <FaFilter />
                                            </button>
                                            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                                                <FaSort />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search jobs..."
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {filteredJobs.map(job => (
                                            <div key={job.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">{job.title}</h3>
                                                        <p className="text-sm text-gray-500">{job.company}</p>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(job.status)}`}>
                                                        {job.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <p className="text-sm text-gray-500">Applied on: {job.date}</p>
                                                    <div className="flex gap-2">
                                                        <button className="p-1 rounded-lg hover:bg-gray-100 transition">
                                                            <FaEye className="text-gray-500" />
                                                        </button>
                                                        <button className="p-1 rounded-lg hover:bg-gray-100 transition">
                                                            <FaTrash className="text-gray-500" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'applications' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">My Applications</h2>
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                                            <FaDownload /> Export
                                        </button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Job Title</th>
                                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Company</th>
                                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredApplications.map(app => (
                                                    <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                                        <td className="py-3 px-4 text-gray-800">{app.job}</td>
                                                        <td className="py-3 px-4 text-gray-600">{app.job.split(' ')[0]}</td>
                                                        <td className="py-3 px-4">
                                                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}>
                                                                {app.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-gray-500">{app.date}</td>
                                                        <td className="py-3 px-4">
                                                            <div className="flex gap-2">
                                                                <button className="p-1 rounded-lg hover:bg-gray-100 transition">
                                                                    <FaEye className="text-gray-500" />
                                                                </button>
                                                                <button className="p-1 rounded-lg hover:bg-gray-100 transition">
                                                                    <FaEdit className="text-gray-500" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'calendar' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">Interview Schedule</h2>
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                                            <FaPlus /> Add Interview
                                        </button>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {[
                                                { id: 1, title: 'Technical Interview', company: 'Tech Corp', date: '2023-11-20', time: '10:00 AM' },
                                                { id: 2, title: 'HR Round', company: 'AI Solutions', date: '2023-11-22', time: '2:00 PM' },
                                                { id: 3, title: 'Final Round', company: 'Web Studio', date: '2023-11-25', time: '11:00 AM' },
                                            ].map(interview => (
                                                <div key={interview.id} className="bg-white p-4 rounded-lg shadow-sm">
                                                    <h3 className="font-medium text-gray-800">{interview.title}</h3>
                                                    <p className="text-sm text-gray-500">{interview.company}</p>
                                                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                                                        <FaCalendarAlt />
                                                        <span>{interview.date}</span>
                                                        <FaChartLine />
                                                        <span>{interview.time}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">Settings</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Settings</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                    <input
                                                        type="text"
                                                        value={user?.name || ''}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                    <input
                                                        type="email"
                                                        value={user?.email || ''}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-700">Email Notifications</span>
                                                    <ToggleSwitch checked={true} onChange={() => {}} />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-700">Dark Mode</span>
                                                    <ToggleSwitch checked={false} onChange={() => {}} />
                                                </div>
                                                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                                                    Save Preferences
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Dashboard;
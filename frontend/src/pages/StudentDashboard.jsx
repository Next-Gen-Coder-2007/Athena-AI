import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaBell, FaBriefcase, FaClipboardList, FaCalendarAlt } from 'react-icons/fa';

const StudentDashboard = () => {
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        setUser(stored ? JSON.parse(stored) : { name: 'Student User', email: 'student@example.com' });

        // Mock data - replace with real API calls
        setApplications([
            { id: 1, job: 'Frontend Developer', company: 'Tech Co', status: 'Interview', applied: '2024-11-01' },
            { id: 2, job: 'Data Analyst', company: 'Data Inc', status: 'Applied', applied: '2024-10-22' },
        ]);

        setRecommended([
            { id: 1, title: 'Fullstack Engineer', company: 'Startup LLC', location: 'Remote' },
            { id: 2, title: 'QA Engineer', company: 'QA Labs', location: 'Onsite' },
        ]);

        setNotifications([
            { id: 1, text: 'Interview scheduled on 2024-12-05', time: '1d ago', read: false },
        ]);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <FaUserCircle className="text-blue-600 text-4xl" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}</h1>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 rounded-md hover:bg-gray-100">
                            <FaBell />
                            {notifications.filter(n => !n.read).length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{notifications.filter(n => !n.read).length}</span>
                            )}
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Edit Profile</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <aside className="lg:col-span-1 bg-white rounded-lg shadow p-5">
                        <h2 className="text-lg font-semibold mb-3">Quick Profile</h2>
                        <p className="text-sm text-gray-600 mb-2"><strong>Name:</strong> {user?.name}</p>
                        <p className="text-sm text-gray-600 mb-4"><strong>Email:</strong> {user?.email}</p>
                        <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 border rounded hover:bg-gray-50 flex items-center gap-2"><FaClipboardList /> My Applications</button>
                            <button className="w-full text-left px-3 py-2 border rounded hover:bg-gray-50 flex items-center gap-2"><FaCalendarAlt /> Interviews</button>
                            <button className="w-full text-left px-3 py-2 border rounded hover:bg-gray-50 flex items-center gap-2"><FaBriefcase /> Saved Jobs</button>
                        </div>
                    </aside>

                    <main className="lg:col-span-2 space-y-6">
                        <section className="bg-white rounded-lg shadow p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Recent Applications</h3>
                                <button className="text-sm text-blue-600">View all</button>
                            </div>
                            <div className="space-y-3">
                                {applications.map(app => (
                                    <div key={app.id} className="flex items-center justify-between border p-3 rounded">
                                        <div>
                                            <p className="font-medium text-gray-800">{app.job} — {app.company}</p>
                                            <p className="text-sm text-gray-500">Applied: {app.applied}</p>
                                        </div>
                                        <div className="text-sm text-gray-700">{app.status}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white rounded-lg shadow p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Recommended Jobs</h3>
                                <button className="text-sm text-blue-600">Refresh</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recommended.map(job => (
                                    <div key={job.id} className="p-3 border rounded">
                                        <p className="font-medium text-gray-800">{job.title}</p>
                                        <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                                        <div className="mt-3 flex items-center gap-2">
                                            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Apply</button>
                                            <button className="px-3 py-1 border rounded text-sm">Save</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;

import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaBell, FaBriefcase, FaUsers, FaPlus, FaCalendarAlt } from 'react-icons/fa';

const RecruiterDashboard = () => {
    const [user, setUser] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        setUser(stored ? JSON.parse(stored) : { name: 'Recruiter', company: 'Company Ltd' });

        // Mock data
        setJobs([
            { id: 1, title: 'Backend Developer', applicants: 12, status: 'Open' },
            { id: 2, title: 'ML Engineer', applicants: 4, status: 'Closed' },
        ]);

        setCandidates([
            { id: 1, name: 'Alice Johnson', appliedFor: 'Backend Developer', status: 'Shortlisted' },
            { id: 2, name: 'Bob Lee', appliedFor: 'Backend Developer', status: 'Applied' },
        ]);

        setNotifications([
            { id: 1, text: 'New application for Backend Developer', time: '2h ago', read: false }
        ]);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <FaUserCircle className="text-blue-600 text-4xl" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{user?.company}</h1>
                            <p className="text-sm text-gray-500">{user?.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 rounded-md hover:bg-gray-100">
                            <FaBell />
                            {notifications.filter(n => !n.read).length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{notifications.filter(n => !n.read).length}</span>
                            )}
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"><FaPlus /> Post Job</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <aside className="lg:col-span-1 bg-white rounded-lg shadow p-5">
                        <h2 className="text-lg font-semibold mb-3">Company</h2>
                        <p className="text-sm text-gray-600 mb-2"><strong>Name:</strong> {user?.company}</p>
                        <p className="text-sm text-gray-600 mb-4"><strong>Contact:</strong> {user?.name}</p>
                        <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 border rounded hover:bg-gray-50 flex items-center gap-2"><FaUsers /> Candidates</button>
                            <button className="w-full text-left px-3 py-2 border rounded hover:bg-gray-50 flex items-center gap-2"><FaCalendarAlt /> Interviews</button>
                        </div>
                    </aside>

                    <main className="lg:col-span-2 space-y-6">
                        <section className="bg-white rounded-lg shadow p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Jobs Posted</h3>
                                <button className="text-sm text-blue-600">View all</button>
                            </div>
                            <div className="space-y-3">
                                {jobs.map(j => (
                                    <div key={j.id} className="flex items-center justify-between border p-3 rounded">
                                        <div>
                                            <p className="font-medium text-gray-800">{j.title}</p>
                                            <p className="text-sm text-gray-500">Applicants: {j.applicants}</p>
                                        </div>
                                        <div className="text-sm text-gray-700">{j.status}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white rounded-lg shadow p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Recent Candidates</h3>
                                <button className="text-sm text-blue-600">Manage</button>
                            </div>
                            <div className="space-y-3">
                                {candidates.map(c => (
                                    <div key={c.id} className="flex items-center justify-between border p-3 rounded">
                                        <div>
                                            <p className="font-medium text-gray-800">{c.name}</p>
                                            <p className="text-sm text-gray-500">Applied for: {c.appliedFor}</p>
                                        </div>
                                        <div className="text-sm text-gray-700">{c.status}</div>
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

export default RecruiterDashboard;

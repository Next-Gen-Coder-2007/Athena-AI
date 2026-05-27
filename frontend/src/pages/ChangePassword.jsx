import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState('');
    const [newPass, setNewPass] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/change-password', { current_password: current, new_password: newPass });
            // after change, navigate to dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Error changing password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-xl font-bold mb-4">Change Password</h1>
                {error && <div className="text-red-600 mb-2">{error}</div>}
                <div className="mb-4">
                    <label className="block text-sm mb-1">Current password</label>
                    <input type="password" value={current} onChange={e=>setCurrent(e.target.value)} className="w-full border p-2 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm mb-1">New password</label>
                    <input type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} className="w-full border p-2 rounded" />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Change Password</button>
            </form>
        </div>
    )
}

export default ChangePassword;

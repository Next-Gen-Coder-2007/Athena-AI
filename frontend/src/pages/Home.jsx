import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useState } from 'react';

const Home = () => {
    const [users, setUsers] = useState([]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-blue-800 mb-2">Welcome</h1>
                <p className="text-gray-600 mb-8">Please log in or register to continue.</p>
                <div className="flex gap-4 justify-center">
                    <a
                        href="/login"
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        <FaSignInAlt /> Login
                    </a>
                    <a
                        href="/register"
                        className="flex items-center gap-2 bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-blue-50 transition-colors duration-200 font-medium"
                    >
                        <FaUserPlus /> Register
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
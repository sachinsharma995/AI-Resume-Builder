import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
    const navigate = useNavigate();
    const username = "User"; // You might want to get this from context/local storage

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, {username}!</h1>
                    <p className="text-gray-600">What would you like to do today?</p>
                </header>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Create New Resume Card */}
                    <div
                        onClick={() => navigate('/builder')}
                        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 group"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                            <i className="fas fa-plus text-blue-600 group-hover:text-white text-xl"></i>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Create New Resume</h2>
                        <p className="text-gray-500">Start from scratch or use our AI builder.</p>
                    </div>

                    {/* Browse Templates Card */}
                    <div
                        onClick={() => navigate('/templates')}
                        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 group"
                    >
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                            <i className="fas fa-file-alt text-purple-600 group-hover:text-white text-xl"></i>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Browse Templates</h2>
                        <p className="text-gray-500">Choose from our professional templates.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;

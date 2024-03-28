import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                email,
                password,
            });
            console.log("Login successful:", response.data);
            navigate('/'); // Make sure the route is correctly defined in your router setup
        } catch (error) {
            console.error("Login failed:", error?.response?.data || error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            email,
            password,
        };

        
        if (secretKey) payload.secretKey = secretKey;

        try {
            const response = await axios.post('http://localhost:8080/api/register', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Registration successful:", response.data);
            setIsLogin(true); // Switch back to the login form upon successful registration
        } catch (error) {
            console.error("Registration failed:", error?.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-center">
                    {isLogin ? 'Admin Login' : 'Admin Registration'}
                </h2>
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200 mb-4"
                >
                    Switch to {isLogin ? 'Register' : 'Login'}
                </button>
                <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
                    {!isLogin && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Secret Key (for admins)</label>
                                <input
                                    type="text"
                                    value={secretKey}
                                    onChange={(e) => setSecretKey(e.target.value)}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                        </>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminPage

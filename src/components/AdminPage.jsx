import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setAuthUser } = useAuth();

    // Note the change here: Removed parameters from handleLogin since it uses state variables directly
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await axios.post(`http://localhost:8080/api/login`, {
                email,
                password
            }, {
                withCredentials: true  // Include credentials to ensure cookies are handled
            });
            
            // Assuming the response includes isAdmin
            if(response.data.isAdmin) {
                // Set user info and admin status in global state/context
                setAuthUser(response.data);
                navigate('/admin/dashboard'); // Redirect to admin dashboard
            } else {
                // Optionally handle non-admin login attempt
                alert("You are not an admin.");
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error);
        }
    };
          
    return (
        <div className="flex h-screen bg-gray-200 justify-center items-center">
            <div className="w-full max-w-xs">
                {/* Note the change here: Corrected onSubmit to call handleLogin directly */}
                <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;

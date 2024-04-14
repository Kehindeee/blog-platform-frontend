import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api';
import { useAuth } from '../context/AuthContext';
import { EyeIcon, EyeSlashIcon  } from '@heroicons/react/24/outline'; // Import both icons
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [error, setError] = useState('');
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return;
    }

    try {
        const { user } = await login(email, password); 
        if (user) {
            setAuthUser({
                id: user.id,        
                email: user.email,  
                name: user.name,    
                isAdmin: user.isAdmin 
            });
            toast.success('Login successful!', {
                onClose: () => {
                    user.isAdmin ? navigate('/admin/dashboard') : navigate('/profile'); // Navigate based on isAdmin status
                }
            });
        } else {
            setError('Login successful, but the user data was not returned.');
        }
    } catch (error) {
        if(error.response && error.response.status === 400) {
            // Specific message for bad request or handle other status codes as needed
            toast.error(error.response.data.message || 'Invalid credentials, please try again.');
        } else {
            // General error handling
            setError('Failed to login. Please check your credentials.');
        }
    }
};


     
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-6 w-6 text-gray-700" />
                ) : (
                  <EyeIcon className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              If you don't have an account,{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                click here to Register
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

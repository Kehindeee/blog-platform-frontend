import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic to logout the user
    setAuthUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-2 sm:p-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {/* Icon for menu */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  // "X" icon for open menu
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger icon for closed menu
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Logo or brand */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="font-bold">Blog.</NavLink>
          </div>

          {/* Primary Nav Menu */}
          <div className={`hidden sm:block ${isOpen ? 'block' : 'hidden'}`}>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-500 border-b-2 border-blue-500 px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>
              Home
            </NavLink>
            {user ? (
              <>
                <NavLink to="/profile" className={({ isActive }) => isActive ? "text-blue-500 border-b-2 border-blue-500 px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>
                  Profile
                </NavLink>
                <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className={({ isActive }) => isActive ? "text-blue-500 border-b-2 border-blue-500 px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

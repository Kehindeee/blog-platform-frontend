import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const activeLinkClass = "text-blue-500 border-b-2 border-blue-500";

  return (
    <nav className="bg-gray-800 text-white p-2 sm:p-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Hamburger Icon on the left for small screens */}
          <div className="sm:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {/* Hamburger icon */}
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {isOpen ? (
                  // Icon for "close" (X) when menu is open
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger icon when menu is closed
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          {/* Brand name or logo here on the left */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="font-bold">Blog.</NavLink>
          </div>

          {/* Primary Nav Menu (hidden on small screens, displayed on the right on medium and up screens) */}
          <div className="hidden sm:flex sm:items-center sm:justify-end sm:ml-6">
            <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass + " px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>
              Home
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? activeLinkClass + " px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>
              Login
            </NavLink>
            {/* Additional NavLink items here */}
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass + " block px-3 py-2 rounded-md text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"} onClick={() => setIsOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/login" className={({ isActive }) => isActive ? activeLinkClass + " block px-3 py-2 rounded-md text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"} onClick={() => setIsOpen(false)}>
          Login
        </NavLink>
        {/* Additional mobile NavLink items here */}
      </div>
    </nav>
  );
};

export default NavBar;

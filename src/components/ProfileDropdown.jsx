import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Added state back
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic to logout the user
    setAuthUser(null);
    navigate('/login');
  };

  const goToUpdatePassword = () => {
    // Navigate to the update password page
    navigate('/update-password');
  };

  return (
    <div className="relative">
      {/* Trigger for the dropdown */}
      <button onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-trigger">
        {/* Your Dropdown Trigger Icon/Text */}
      </button>

      {/* The actual dropdown, show/hide based on dropdownOpen state */}
      <div className={`dropdown-menu ${dropdownOpen ? 'block' : 'hidden'}`}>
        {/* Dropdown items */}
        <button onClick={goToUpdatePassword} className="dropdown-item">
          Update Password
        </button>
        <button onClick={handleLogout} className="dropdown-item">
          Logout
        </button>
        {/* ... other dropdown items */}
      </div>
    </div>
  );
};

export default ProfileDropdown;

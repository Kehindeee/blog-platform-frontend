// In AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // This function will be called to update the user state within the context
  const setAuthUser = (userData) => {
    setUser(userData);
  };

  // Value that will be accessible to any child component
  const contextValue = {
    user, // The user state
    setAuthUser, // The function to update the user state
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for child components to get the auth object and re-render when it changes
export const useAuth = () => useContext(AuthContext);

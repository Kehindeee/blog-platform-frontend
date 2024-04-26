// Jest mocks for the AuthContext and AuthProvider components
import React from 'react';

export const AuthContext = React.createContext();

export const getCurrentUser = jest.fn();

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
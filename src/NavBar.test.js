import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import { AuthContext } from './context/AuthContext';


// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('NavBar Component', () => {
  const mockLogout = jest.fn();

  const renderNavBarWithAuth = (user) => {
    return render(
      <AuthContext.Provider value={{ user, setAuthUser: mockLogout }}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  it('should toggle mobile menu', () => {
    renderNavBarWithAuth();
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    expect(screen.getByText(/home/i)).toBeVisible(); // Checks if menu is now open
    fireEvent.click(menuButton);
    // Add your assertion to check if the menu is closed
  });

  it('should show login when no user is authenticated', () => {
    renderNavBarWithAuth(null);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).toBeNull();
  });

  it('should show profile and logout when user is authenticated', () => {
    renderNavBarWithAuth({ name: 'Test User' });
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.queryByText(/login/i)).toBeNull();
  });

  it('should navigate to login on logout', () => {
    renderNavBarWithAuth({ name: 'Test User' });
    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });

  it('should show dashboard link for admin users', () => {
    renderNavBarWithAuth({ name: 'Admin User', isAdmin: true });
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

});

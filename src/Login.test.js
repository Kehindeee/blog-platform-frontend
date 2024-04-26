import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Login from './components/Login';
import { toast } from 'react-toastify';
import { login as mockLogin } from './api';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn()
  }
}));

jest.mock('./api', () => ({
  login: jest.fn()
}));

const setup = () => {
  render(
    <Router>
      <AuthContextProvider>
        <Login />
      </AuthContextProvider>
    </Router>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('inputs should be initially empty', () => {
    setup();
    expect(screen.getByPlaceholderText('Email address')).toHaveValue('');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('');
  });

  test('should allow entering email and password', () => {
    setup();
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('show password toggle button works correctly', () => {
    setup();
    const passwordInput = screen.getByPlaceholderText('Password');
    const toggleButton = screen.getByRole('button', {
      name: /toggle password visibility/i
    });
    expect(passwordInput).toHaveAttribute('type', 'password');
    userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('displays an error toast when password is too short', async () => {
    setup();
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(emailInput, 'user@example.com');
    userEvent.type(passwordInput, 'short'); // less than 8 characters
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Password must be at least 8 characters long.");
    });
  });

  test('submits form and navigates user accordingly', async () => {
    mockLogin.mockResolvedValue({ user: { id: 1, email: 'user@example.com', name: 'User', isAdmin: false } });
    setup();
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(emailInput, 'user@example.com');
    userEvent.type(passwordInput, 'password123');
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'password123');
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });
  });
});

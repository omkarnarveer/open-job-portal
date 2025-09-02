import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem('tokens') || 'null');
    if (tokens) {
      // In a real app, you would verify the token with the server
      // For now, we'll assume a valid token means the user is logged in
      // You should fetch the user's details from the 'me' endpoint here
      setUser({ username: 'demo_user', role: 'JOB_SEEKER' });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await client.post('/api/auth/login/', { username, password });
      localStorage.setItem('tokens', JSON.stringify(res.data));
      // Fetch user details from a hypothetical 'me' endpoint after login
      const userRes = await client.get('/api/auth/me/');
      setUser(userRes.data);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const res = await client.post('/api/auth/register/', userData);
      localStorage.setItem('tokens', JSON.stringify(res.data));
      const userRes = await client.get('/api/auth/me/');
      setUser(userRes.data);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('tokens');
    setUser(null);
  };

  const value = { user, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
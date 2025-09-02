import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const tokens = JSON.parse(localStorage.getItem('tokens') || 'null');
      if (tokens) {
        try {
          client.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
          const userRes = await client.get('/api/auth/me/');
          setUser(userRes.data);
        } catch (error) {
          localStorage.removeItem('tokens');
          delete client.defaults.headers.common['Authorization'];
          setUser(null);
        }
      }
    };
    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      const res = await client.post('/api/auth/login/', { username, password });
      localStorage.setItem('tokens', JSON.stringify(res.data));
      client.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
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
      // The register endpoint returns a 201 status but not a token.
      // We need to immediately log in the user to get the token.
      const loginRes = await client.post('/api/auth/login/', { username: userData.username, password: userData.password });
      localStorage.setItem('tokens', JSON.stringify(loginRes.data));
      client.defaults.headers.common['Authorization'] = `Bearer ${loginRes.data.access}`;
      const userRes = await client.get('/api/auth/me/');
      setUser(userRes.data);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('tokens');
    delete client.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = { user, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
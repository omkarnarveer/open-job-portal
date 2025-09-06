import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';
import { jwtDecode } from 'jwt-decode'; // You will need to install this: npm install jwt-decode

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const tokens = JSON.parse(localStorage.getItem('tokens') || 'null');
      if (tokens) {
        try {
          // Check if token is expired
          const decodedToken = jwtDecode(tokens.access);
          if (decodedToken.exp * 1000 < Date.now()) {
            throw new Error("Token expired");
          }
          
          client.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
          // CORRECTED PATH
          const userRes = await client.get('/auth/me/');
          setUser(userRes.data);
        } catch (error) {
          console.error("Auth useEffect error:", error);
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
      // This call was already correct
      const res = await client.post('/token/', { username, password });
      localStorage.setItem('tokens', JSON.stringify(res.data));
      client.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
      // CORRECTED PATH
      const userRes = await client.get('/auth/me/');
      setUser(userRes.data);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // CORRECTED PATH
      await client.post('/auth/register/', userData);
      // REFACTORED LOGIC: Call the login function to avoid repeating code
      await login(userData.username, userData.password);
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
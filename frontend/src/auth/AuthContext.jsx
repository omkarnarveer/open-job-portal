import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(() => JSON.parse(localStorage.getItem('tokens') || 'null'));

  useEffect(() => {
    if (tokens?.access) {
      client.get('/auth/me/').then(res => setUser(res.data)).catch(() => setUser(null));
    }
  }, [tokens]);

  const login = async (username, password) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login/`, { username, password });
    setTokens(res.data);
    localStorage.setItem('tokens', JSON.stringify(res.data));
    const me = await client.get('/auth/me/');
    setUser(me.data);
  };

  const logout = () => {
    setTokens(null);
    setUser(null);
    localStorage.removeItem('tokens');
  };

  const register = async (payload) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register/`, payload);
  };

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      nav('/');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 lg:p-12 transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h3>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={submit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="shadow-inner appearance-none border-2 border-gray-300 rounded-full w-full py-3 px-12 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-accent-teal focus:border-transparent transition-all duration-200"
                id="username"
                type="text"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="shadow-inner appearance-none border-2 border-gray-300 rounded-full w-full py-3 px-12 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-4 focus:ring-accent-teal focus:border-transparent transition-all duration-200"
                id="password"
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-primary-blue hover:bg-accent-teal text-white font-bold py-3 px-4 rounded-full shadow-lg focus:outline-none focus:shadow-outline transition-all duration-200 transform hover:scale-105 active:scale-95"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
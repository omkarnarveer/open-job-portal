import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { FaUserPlus, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'JOB_SEEKER' });
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      nav('/login');
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center items-center min-h-screen animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 lg:p-12 transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h3>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-gray" />
              <input
                className="shadow-inner appearance-none border-2 border-gray-300 rounded-full w-full py-3 px-12 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-accent-teal focus:border-transparent transition-all duration-200"
                id="username"
                type="text"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-gray" />
              <input
                className="shadow-inner appearance-none border-2 border-gray-300 rounded-full w-full py-3 px-12 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-accent-teal focus:border-transparent transition-all duration-200"
                id="email"
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-gray" />
              <input
                className="shadow-inner appearance-none border-2 border-gray-300 rounded-full w-full py-3 px-12 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-accent-teal focus:border-transparent transition-all duration-200"
                id="password"
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="role">
              Role
            </label>
            <select
              className="shadow-inner appearance-none border-2 border-gray-300 rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-accent-teal focus:border-transparent transition-all duration-200"
              id="role"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
            >
              <option value="JOB_SEEKER">Job Seeker</option>
              <option value="EMPLOYER">Employer</option>
            </select>
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="w-full flex items-center justify-center space-x-2 bg-accent-teal hover:bg-teal-400 text-white font-bold py-3 px-4 rounded-full shadow-lg focus:outline-none focus:shadow-outline transition-all duration-200 transform hover:scale-105 active:scale-95"
              type="submit"
            >
              <FaUserPlus />
              <span>Create account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
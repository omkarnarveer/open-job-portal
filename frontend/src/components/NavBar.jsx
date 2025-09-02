import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { FaSignOutAlt, FaPlus, FaUserCircle } from 'react-icons/fa';

export default function NavBar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow-lg p-4 sticky top-0 z-50 font-poppins">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <Link to="/" className="text-2xl font-bold text-primary-blue hover:text-accent-teal transition-colors">
          Open Job Portal
        </Link>
        <div className="flex-grow flex justify-end items-center space-x-4">
          <Link to="/jobs" className="text-deep-gray hover:text-primary-blue transition-colors hidden md:block">
            Jobs
          </Link>
          {user?.role === 'EMPLOYER' && (
            <Link to="/dashboard/employer" className="text-deep-gray hover:text-primary-blue transition-colors hidden md:block">
              <span className="flex items-center space-x-2">
                <FaPlus className="text-green-500" />
                <span>Employer Dashboard</span>
              </span>
            </Link>
          )}
          {user?.role === 'JOB_SEEKER' && (
            <Link to="/dashboard/seeker" className="text-deep-gray hover:text-primary-blue transition-colors hidden md:block">
              My Applications
            </Link>
          )}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="text-deep-gray hover:text-primary-blue transition-colors hidden md:block">
                <span className="flex items-center space-x-2">
                  <FaUserCircle className="text-primary-blue" />
                  <span>{user.username}</span>
                </span>
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="px-6 py-2 text-sm font-semibold bg-primary-blue text-white rounded-full shadow-md hover:bg-accent-teal transition-all duration-200 transform hover:scale-105">
                Login
              </Link>
              <Link to="/register" className="px-6 py-2 text-sm font-semibold border-2 border-primary-blue text-primary-blue rounded-full hover:bg-primary-blue hover:text-white transition-all duration-200 transform hover:scale-105">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
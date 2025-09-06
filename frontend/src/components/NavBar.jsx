import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { FaSignOutAlt, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

export default function NavBar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeLinkStyle = {
    color: '#00A9A5', // accent-teal
    fontWeight: '600',
  };

  const navLinkClass = "text-deep-gray hover:text-primary-blue transition-colors";

  const renderNavLinks = () => (
    <>
      <NavLink to="/jobs" className={navLinkClass} style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
        Jobs
      </NavLink>
      {user?.role === 'EMPLOYER' && (
        <NavLink to="/dashboard/employer" className={navLinkClass} style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
          Employer Dashboard
        </NavLink>
      )}
      {user?.role === 'JOB_SEEKER' && (
        <NavLink to="/dashboard/seeker" className={navLinkClass} style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
          My Applications
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-md p-4 sticky top-0 z-50 font-poppins">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-blue hover:text-accent-teal transition-colors">
          Open Job Portal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {renderNavLinks()}
          {user ? (
            <div className="flex items-center space-x-4">
              <NavLink to="/profile" className={navLinkClass} style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                <span className="flex items-center space-x-2">
                  <FaUserCircle className="text-primary-blue" />
                  <span>{user.username}</span>
                </span>
              </NavLink>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login" className="px-6 py-2 text-sm font-semibold bg-primary-blue text-white rounded-full shadow-md hover:bg-accent-teal transition-all">
                Login
              </Link>
              <Link to="/register" className="px-6 py-2 text-sm font-semibold border-2 border-primary-blue text-primary-blue rounded-full hover:bg-primary-blue hover:text-white transition-all">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-xl p-4 flex flex-col space-y-4">
          {renderNavLinks()}
          <hr/>
          {user ? (
            <>
              <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
              <button onClick={logout} className="text-left text-red-600 font-semibold">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-center px-6 py-2 text-sm font-semibold bg-primary-blue text-white rounded-full">Login</Link>
              <Link to="/register" className="text-center px-6 py-2 text-sm font-semibold border-2 border-primary-blue text-primary-blue rounded-full">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
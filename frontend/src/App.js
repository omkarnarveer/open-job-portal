import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import DashboardSeeker from './pages/DashboardSeeker';
import DashboardEmployer from './pages/DashboardEmployer';
import Profile from './pages/Profile';
import PrivateRoute from './auth/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <main className="min-h-screen pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/seeker" element={
              <PrivateRoute role="JOB_SEEKER"><DashboardSeeker /></PrivateRoute>
            } />
            <Route path="/dashboard/employer" element={
              <PrivateRoute role="EMPLOYER"><DashboardEmployer /></PrivateRoute>
            } />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
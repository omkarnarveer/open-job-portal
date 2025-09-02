import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="bg-gradient-to-br from-primary-blue to-blue-800 min-h-screen flex items-center justify-center py-16 text-white font-poppins">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
          Find Your <span className="text-accent-teal">Dream Job</span> Today
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto opacity-90">
          Browse thousands of opportunities from top employers and take the next step in your career.
        </p>
        <Link
          to="/jobs"
          className="inline-block px-10 py-4 text-xl font-bold bg-accent-teal text-white rounded-full shadow-2xl hover:bg-teal-400 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Browse Jobs
        </Link>
      </div>
    </section>
  );
}
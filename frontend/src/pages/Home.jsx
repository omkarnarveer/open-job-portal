import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';
import JobCard from '../components/JobCard';

export default function Home() {
  const [featuredJobs, setFeaturedJobs] = useState([]);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        // REMOVED /api prefix from the start of the path
        const res = await client.get('/jobs/?limit=3'); 
        setFeaturedJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch featured jobs:", error);
      }
    };
    fetchFeaturedJobs();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-blue to-blue-800 flex items-center justify-center pt-24 pb-16 text-white font-poppins">
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

      {/* Featured Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Latest Job Openings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs.length > 0 ? (
              featuredJobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <p className="text-center col-span-3">Loading jobs...</p>
            )}
          </div>
        </div>
      </section>

      {/* Social Proof / Trusted By Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-center text-gray-600 text-lg font-semibold mb-6">
            Connecting talent with leading companies
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
            {/* Replace with actual client logos */}
            <p className="font-bold text-gray-400 text-2xl">TechCorp</p>
            <p className="font-bold text-gray-400 text-2xl">Innovate Inc.</p>
            <p className="font-bold text-gray-400 text-2xl">Solutions LLC</p>
            <p className="font-bold text-gray-400 text-2xl">Future Systems</p>
            <p className="font-bold text-gray-400 text-2xl">NextGen</p>
          </div>
        </div>
      </section>
    </>
  );
}
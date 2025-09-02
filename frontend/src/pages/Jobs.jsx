import React, { useEffect, useState } from 'react';
import client from '../api/client';
import JobCard from '../components/JobCard';
import { FaSearch } from 'react-icons/fa';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [q, setQ] = useState('');
  const [jobType, setJobType] = useState('');

  const load = async () => {
    const params = {
      ...(q && { search: q }),
      ...(jobType && { job_type: jobType }),
    };
    try {
      // Corrected: The API call is triggered whenever `q` or `jobType` changes.
      const res = await client.get('/api/jobs/', { params });
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs([]);
    }
  };

  useEffect(() => {
    // Corrected: The `load` function is now called when `q` or `jobType` changes.
    load();
  }, [q, jobType]);

  return (
    <div className="container mx-auto p-6 font-poppins">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4 animate-fade-in-up">
        <div className="relative w-full md:w-2/3">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-gray" />
          <input
            type="text"
            placeholder="Search by keyword or location..."
            className="w-full pl-12 pr-5 py-3 border-2 border-gray-300 rounded-full shadow-inner focus:outline-none focus:ring-4 focus:ring-primary-blue transition-all duration-300 placeholder-gray-400"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3 flex items-center space-x-4">
          <div className="relative flex-grow">
            <select
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-full shadow-inner focus:outline-none focus:ring-4 focus:ring-primary-blue transition-all duration-300 text-deep-gray appearance-none"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">All types</option>
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((j) => (
          <JobCard key={j.id} job={j} />
        ))}
      </div>
    </div>
  );
}
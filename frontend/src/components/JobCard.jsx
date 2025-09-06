import React from 'react';
import { Link } from 'react-router-dom';
// Import new icons
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

const formatPostedDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays <= 1) return 'Posted today';
  if (diffDays <= 7) return `Posted ${diffDays} days ago`;
  return `Posted on ${date.toLocaleDateString()}`;
}

export default function JobCard({ job }) {
  const {
    id,
    title,
    description,
    location,
    job_type,
    is_filled,
    employer_logo,
    created_at,
    // Destructure new fields from the job prop
    company_name,
    salary_ctc,
    openings,
  } = job;

  const shortDesc =
    description.length > 100 ? description.slice(0, 100) + '…' : description;

  return (
    <div className="h-full p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-xl hover:border-primary-blue transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* Display Company Name */}
            <p className="text-sm font-semibold text-primary-blue">{company_name}</p>
            <h3 className="text-xl font-bold text-gray-800 leading-tight mt-1">{title}</h3>
          </div>
          {employer_logo && (
            <img src={employer_logo} alt={`${company_name} logo`} className="w-14 h-14 rounded-lg object-contain bg-gray-50 p-1 ml-4" />
          )}
        </div>
        
        {/* Display all new fields */}
        <div className="flex flex-col text-sm text-gray-600 space-y-2 mb-4">
          <span className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-400" /> {location}</span>
          <span className="flex items-center"><FaBriefcase className="mr-2 text-gray-400" /> {job_type.replace('_', ' ')}</span>
          {salary_ctc && (
            <span className="flex items-center"><FaMoneyBillWave className="mr-2 text-gray-400" /> ₹{salary_ctc} LPA</span>
          )}
          <span className="flex items-center"><FaUsers className="mr-2 text-gray-400" /> {openings} Opening(s)</span>
        </div>
        
        <p className="text-gray-700 leading-relaxed text-sm">{shortDesc}</p>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xs text-gray-500">
          {formatPostedDate(created_at)}
        </p>
        {!is_filled && (
          <Link
            to={`/jobs/${id}`}
            className="px-5 py-2 text-sm font-semibold bg-primary-blue text-white rounded-full shadow-lg hover:bg-accent-teal transition-colors duration-200"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}

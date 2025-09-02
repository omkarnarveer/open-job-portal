import React from 'react';
import { Link } from 'react-router-dom';

export default function JobCard({ job, onApply }) {
  const {
    id,
    title,
    description,
    location,
    job_type,
    is_filled,
    employer_name,
    created_at
  } = job;

  const shortDesc =
    description.length > 120 ? description.slice(0, 120) + '…' : description;

  const getJobTypeColor = (type) => {
    const typeMap = {
      FULL_TIME: 'bg-green-100 text-green-800',
      PART_TIME: 'bg-blue-100 text-blue-800',
      CONTRACT: 'bg-yellow-100 text-yellow-800',
      INTERNSHIP: 'bg-purple-100 text-purple-800'
    };
    return typeMap[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="h-full p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-2">
      <div>
        <h3 className="text-2xl font-bold text-gray-800 leading-tight">{title}</h3>
        <p className="mt-2 text-sm text-deep-gray">
          <span className="font-semibold">{location}</span>
          <span className={`inline-flex items-center ml-2 px-3 py-1 rounded-full text-xs font-semibold ${getJobTypeColor(job_type)}`}>
            {job_type}
          </span>
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">{shortDesc}</p>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xs text-gray-500">
          Posted by <span className="font-medium text-gray-700">{employer_name}</span> on {new Date(created_at).toLocaleDateString()}
        </p>

        {is_filled ? (
          <span className="inline-flex items-center px-4 py-2 text-xs font-semibold bg-gray-200 text-gray-700 rounded-full">
            Filled
          </span>
        ) : onApply ? (
          <button
            onClick={() => onApply(job)}
            className="px-6 py-3 text-sm font-semibold bg-primary-blue text-white rounded-full shadow-lg hover:bg-accent-teal transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Apply
          </button>
        ) : (
          <Link
            to={`/jobs/${id}`}
            className="px-6 py-3 text-sm font-semibold bg-primary-blue text-white rounded-full shadow-lg hover:bg-accent-teal transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
}
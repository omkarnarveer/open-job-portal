import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { FaEnvelope } from 'react-icons/fa';

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await client.get(`/api/jobs/${id}/`);
        setJob(res.data);
      } catch (error) {
        console.error("Failed to fetch job details:", error);
        setJob(null);
      }
    };
    fetchJob();
  }, [id]);

  const apply = async () => {
    const formData = new FormData();
    formData.append('job', id);
    formData.append('cover_letter', coverLetter);
    try {
      await client.post('/api/applications/', formData, { headers: { 'Content-Type': 'multipart/form-data' }});
      setMessage('Application submitted!');
    } catch (error) {
      console.error("Failed to submit application:", error);
      setMessage('Failed to submit application.');
    }
  };

  if (!job) return null;
  return (
    <div className="container mx-auto p-6 font-poppins">
      <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
        <h3 className="text-3xl lg:text-4xl font-extrabold text-primary-blue mb-2">{job.title}</h3>
        <p className="text-gray-600 text-lg mb-6">
          <strong className="font-semibold text-deep-gray">Location:</strong> {job.location} • <strong className="font-semibold text-deep-gray">Type:</strong> {job.job_type}
        </p>
        <p className="text-gray-700 leading-relaxed mb-8 text-base lg:text-lg">{job.description}</p>
        
        {message && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-4" role="alert">
            <p className="font-bold">Success</p>
            <p>{message}</p>
          </div>
        )}
        
        {user?.role === 'JOB_SEEKER' && !job.is_filled && (
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h4 className="text-2xl font-bold text-deep-gray mb-4">Apply for this Job</h4>
            <div className="mb-6">
              <label htmlFor="cover-letter" className="block text-sm font-semibold text-gray-700 mb-2">
                Cover Letter
              </label>
              <textarea
                id="cover-letter"
                rows="6"
                className="block w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal transition-all duration-300 sm:text-sm placeholder-gray-400"
                value={coverLetter}
                onChange={e => setCoverLetter(e.target.value)}
              />
            </div>
            <button
              onClick={apply}
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-accent-teal rounded-lg shadow-lg hover:bg-teal-400 transition-all duration-200 transform hover:scale-105 active:scale-95 space-x-2"
            >
              <FaEnvelope className="w-5 h-5" />
              <span>Apply</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
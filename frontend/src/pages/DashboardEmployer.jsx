import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { FaTrash, FaCheck, FaUsers, FaChevronLeft, FaFilePdf } from 'react-icons/fa';

export default function DashboardEmployer() {
  const [jobs, setJobs] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    job_type: 'FULL_TIME',
  });

  const loadJobs = async () => {
    try {
      const res = await client.get('/api/jobs/');
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  const loadApplications = async (jobId) => {
    try {
      const res = await client.get(`/api/applications/?job=${jobId}`);
      setApplications(res.data);
      setSelectedJob(jobs.find(j => j.id === jobId));
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const createJob = async () => {
    try {
      await client.post('/api/jobs/', form);
      setShowJobForm(false);
      setForm({
        title: '',
        description: '',
        requirements: '',
        location: '',
        job_type: 'FULL_TIME',
      });
      loadJobs();
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  const markFilled = async (id) => {
    try {
      await client.post(`/api/jobs/${id}/mark_filled/`);
      loadJobs();
    } catch (error) {
      console.error("Failed to mark job as filled:", error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await client.delete(`/api/jobs/${id}/`);
      loadJobs();
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  const updateApplicationStatus = async (appId, status) => {
    try {
      await client.post(`/api/applications/${appId}/update_status/`, { status });
      loadApplications(selectedJob.id);
    } catch (error) {
      console.error("Failed to update application status:", error);
    }
  };

  if (selectedJob) {
    return (
      <div className="container mx-auto p-6 font-poppins">
        <div className="flex items-center mb-6 space-x-4">
          <button onClick={() => setSelectedJob(null)} className="text-gray-600 hover:text-primary-blue transition-colors">
            <FaChevronLeft />
          </button>
          <h3 className="text-3xl font-bold text-gray-800">Applicants for {selectedJob.title}</h3>
        </div>
        <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cover Letter</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Resume</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map(app => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.seeker_username}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{app.cover_letter.slice(0, 50)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.resume && (
                      <a href={app.resume} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-primary-blue hover:text-accent-teal">
                        <FaFilePdf />
                        <span>View Resume</span>
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${app.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : app.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => updateApplicationStatus(app.id, 'ACCEPTED')} className="text-green-600 hover:text-green-900 transition-colors">Accept</button>
                    <button onClick={() => updateApplicationStatus(app.id, 'REJECTED')} className="text-red-600 hover:text-red-900 transition-colors">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800">My Job Listings</h3>
        <button
          className="px-6 py-2 text-sm font-semibold bg-primary-blue text-white rounded-full shadow-md hover:bg-accent-teal transition-all duration-200 transform hover:scale-105"
          onClick={() => setShowJobForm(true)}
        >
          Post Job
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicants</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((j) => (
              <tr key={j.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{j.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{j.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      j.is_filled ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {j.is_filled ? 'Filled' : 'Open'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => loadApplications(j.id)} className="text-primary-blue hover:text-accent-teal transition-colors flex items-center space-x-2">
                    <FaUsers />
                    <span>View Applicants</span>
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {!j.is_filled && (
                    <button
                      className="text-primary-blue hover:text-accent-teal transition-colors"
                      onClick={() => markFilled(j.id)}
                    >
                      <FaCheck />
                    </button>
                  )}
                  <button
                    className="text-red-600 hover:text-red-900 transition-colors"
                    onClick={() => deleteJob(j.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showJobForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-60"
            onClick={() => setShowJobForm(false)}
          ></div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg relative z-10">
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-2xl font-bold text-gray-800">Post a Job</h3>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowJobForm(false)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal transition-all duration-300 sm:text-sm placeholder-gray-400"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  rows="5"
                  className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal transition-all duration-300 sm:text-sm placeholder-gray-400"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements</label>
                <textarea
                  rows="3"
                  className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal transition-all duration-300 sm:text-sm placeholder-gray-400"
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal transition-all duration-300 sm:text-sm placeholder-gray-400"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                <select
                  className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal transition-all duration-300 sm:text-sm text-gray-700"
                  value={form.job_type}
                  onChange={(e) => setForm({ ...form, job_type: e.target.value })}
                >
                  <option value="FULL_TIME">Full-time</option>
                  <option value="PART_TIME">Part-time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  className="px-6 py-3 text-sm font-semibold bg-accent-teal text-white rounded-full shadow-md hover:bg-teal-400 transition-all duration-200 transform hover:scale-105 active:scale-95"
                  onClick={createJob}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
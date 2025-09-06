import React, { useEffect, useState, useMemo } from 'react';
import client from '../api/client';
import { FaBriefcase, FaClipboardList, FaPlus, FaTrash, FaCheck, FaUsers, FaChevronLeft, FaFilePdf } from 'react-icons/fa';

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
    company_name: '',
    salary_ctc: '',
    openings: 1,
  });

  const dashboardStats = useMemo(() => {
    const totalJobs = jobs.length;
    const openPositions = jobs.filter(j => !j.is_filled).length;
    const totalApplicants = jobs.reduce((acc, j) => acc + (j.applicant_count || 0), 0);
    return { totalJobs, openPositions, totalApplicants };
  }, [jobs]);

  const loadJobs = async () => {
    try {
      const res = await client.get('/jobs/');
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  const loadApplications = async (jobId) => {
    try {
      const res = await client.get(`/applications/?job=${jobId}`);
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
      await client.post('/jobs/', form);
      setShowJobForm(false);
      // Reset form to initial state, including new fields
      setForm({
        title: '',
        description: '',
        requirements: '',
        location: '',
        job_type: 'FULL_TIME',
        company_name: '',
        salary_ctc: '',
        openings: 1,
      });
      loadJobs();
    } catch (error)
    {
      console.error("Failed to create job:", error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await client.delete(`/jobs/${id}/`);
      loadJobs();
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  const updateApplicationStatus = async (appId, newStatus) => {
    try {
      await client.patch(`/applications/${appId}/`, { status: newStatus });
      loadApplications(selectedJob.id);
    } catch (error) {
      console.error("Failed to update application status:", error);
    }
  };

   if (selectedJob) {
    return (
      <div className="container mx-auto p-6 font-poppins">
        {/* --- APPLICANTS VIEW --- */}
        <div className="flex items-center mb-6 space-x-4">
          <button onClick={() => setSelectedJob(null)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <FaChevronLeft className="text-gray-600" />
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
              {applications.length > 0 ? (
                applications.map(app => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.seeker_username}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{app.cover_letter}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {app.resume ? (
                        <a href={app.resume} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-primary-blue hover:text-accent-teal">
                          <FaFilePdf />
                          <span>View Resume</span>
                        </a>
                      ) : (
                        <span>N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${app.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : app.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                      <button onClick={() => updateApplicationStatus(app.id, 'ACCEPTED')} className="text-green-600 hover:text-green-900 transition-colors font-semibold">Accept</button>
                      <button onClick={() => updateApplicationStatus(app.id, 'REJECTED')} className="text-red-600 hover:text-red-900 transition-colors font-semibold">Reject</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    No applicants for this job yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 font-poppins">
      {/* --- DASHBOARD & JOB LISTINGS VIEW --- */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full"><FaBriefcase className="text-primary-blue text-2xl" /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Jobs Posted</p>
                        <p className="text-3xl font-bold text-gray-800">{dashboardStats.totalJobs}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full"><FaClipboardList className="text-green-600 text-2xl" /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Open Positions</p>
                        <p className="text-3xl font-bold text-gray-800">{dashboardStats.openPositions}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-full"><FaUsers className="text-purple-600 text-2xl" /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Applicants</p>
                        <p className="text-3xl font-bold text-gray-800">{dashboardStats.totalApplicants}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800">My Job Listings</h3>
        <button
          className="flex items-center space-x-2 px-6 py-2 text-sm font-semibold bg-primary-blue text-white rounded-full shadow-md hover:bg-accent-teal transition-all"
          onClick={() => setShowJobForm(true)}
        >
          <FaPlus />
          <span>Post New Job</span>
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
            {/* Table Head */}
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicants</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((j) => (
                    <tr key={j.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{j.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{j.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${j.is_filled ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-green-800'}`}>
                                {j.is_filled ? 'Filled' : 'Open'}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => loadApplications(j.id)} className="text-primary-blue hover:text-accent-teal transition-colors flex items-center space-x-2">
                                <FaUsers />
                                <span>View Applicants</span>
                            </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                            <button className="text-red-600 hover:text-red-900 transition-colors" onClick={() => deleteJob(j.id)}>
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
          <div className="fixed inset-0 bg-gray-900 bg-opacity-60" onClick={() => setShowJobForm(false)}></div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg relative z-10">
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-2xl font-bold text-gray-800">Post a Job</h3>
              <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setShowJobForm(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            {/* --- UPDATED FORM WITH NEW FIELDS --- */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal"
                  value={form.company_name}
                  onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  rows="5"
                  className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements</label>
                <textarea
                  rows="3"
                  className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal"
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Offered CTC (LPA)</label>
                  <input
                    type="number"
                    placeholder="e.g., 12.5"
                    className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal"
                    value={form.salary_ctc}
                    onChange={(e) => setForm({ ...form, salary_ctc: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2"># of Openings</label>
                  <input
                    type="number"
                    min="1"
                    className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal"
                    value={form.openings}
                    onChange={(e) => setForm({ ...form, openings: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                <select
                  className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal"
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
                  className="px-6 py-3 text-sm font-semibold bg-accent-teal text-white rounded-full shadow-md hover:bg-teal-400 transition-all duration-200 transform hover:scale-105"
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
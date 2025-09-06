import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../auth/AuthContext';

// --- SVG Icon Components (replaces react-icons) ---

const EnvelopeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
  </svg>
);

const MapMarkerIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
  </svg>
);

const ClockIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
    </svg>
);

const ClipboardListIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1zM4 1.5A1.5 1.5 0 0 1 5.5 0h5A1.5 1.5 0 0 1 12 1.5v1A1.5 1.5 0 0 1 10.5 4h-5A1.5 1.5 0 0 1 4 2.5v-1zM5 2.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5v1z"/>
        <path fillRule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
        <path d="M8.5 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm-5 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
    </svg>
);

const InfoCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.064.293.006.399.287.47l.45.082.082-.38-2.29-.287a.5.5 0 0 1-.45-.492l.738-3.468a.5.5 0 0 1 .45-.492l2.29.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
    </svg>
);

const MoneyBillIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path d="M4 10.781c.596.313 1.35.422 2.188.313A14.05 14.05 0 0 0 12 10.5V11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.219c.354.067.708.12 1.062.156A13.007 13.007 0 0 1 4 10.781zM3 5.719a1 1 0 0 1 .438-.812c.328-.21.734-.362 1.188-.476a13.007 13.007 0 0 1 2.312-.217c.852-.047 1.62.013 2.281.109a1 1 0 0 1 .438.812V6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.281zM11 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v1h8V4zM4.5 12a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm6 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM1 11a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1z"/>
    </svg>
);

const UsersIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path d="M7 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
    </svg>
);


export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await client.get(`/jobs/${id}/`);
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
    if (resume) {
      formData.append('resume', resume);
    }

    try {
      await client.post('/applications/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessageType('success');
      setMessage('Application submitted successfully!');
      setCoverLetter('');
      setResume(null);
    } catch (error) {
      console.error("Failed to submit application:", error);
      setMessageType('error');
      setMessage(error.response?.data?.detail || 'Failed to submit application.');
    }
  };

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-6">
        <p className="text-xl text-gray-600">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 font-poppins">
      <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
        {/* --- HEADER SECTION --- */}
        <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-blue mb-3">{job.title}</h1>
        <p className="text-xl font-semibold text-deep-gray mb-3">{job.company_name}</p>

        <div className="flex flex-wrap items-center text-lg text-deep-gray mb-8 gap-x-6 gap-y-2">
          <span className="flex items-center space-x-2">
            <MapMarkerIcon className="text-accent-teal" />
            <span>{job.location}</span>
          </span>
          <span className="flex items-center space-x-2">
            <ClockIcon className="text-accent-teal" />
            <span>{job.job_type.replace('_', ' ')}</span>
          </span>
          
          <span className="flex items-center space-x-2">
            <MoneyBillIcon className="text-accent-teal" />
            <span>{job.salary_ctc ? `₹${job.salary_ctc} LPA` : 'Not specified'}</span>
          </span>
          
          <span className="flex items-center space-x-2">
            <UsersIcon className="text-accent-teal" />
            <span>{job.openings} Opening(s)</span>
          </span>
        </div>
        
        {/* --- END OF HEADER --- */}

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${messageType === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'} border-l-4`} role="alert">
            <p className="font-bold">{messageType === 'success' ? 'Success' : 'Error'}</p>
            <p>{message}</p>
          </div>
        )}
        
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-deep-gray mb-4 flex items-center space-x-3">
            <ClipboardListIcon className="text-accent-teal" />
            <span>Job Description</span>
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {job.description.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-deep-gray mb-4 flex items-center space-x-3">
            <InfoCircleIcon className="text-accent-teal" />
            <span>Key Requirements</span>
          </h2>
          {job.requirements ? (
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 pl-4">
              {job.requirements.split('\n').map((requirement, index) => (
                requirement.trim() && <li key={index}>{requirement.trim()}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-lg">No specific requirements listed.</p>
          )}
        </div>

        {user?.role === 'JOB_SEEKER' && !job.is_filled && (
          <div className="mt-10 border-t border-gray-200 pt-10">
            <h2 className="text-3xl font-bold text-deep-gray mb-6 flex items-center space-x-3">
              <EnvelopeIcon className="text-accent-teal" />
              <span>Apply for this Job</span>
            </h2>
            <form className="space-y-6">
               <div>
                <label htmlFor="cover-letter" className="block text-base font-semibold text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  id="cover-letter"
                  rows="6"
                  className="block w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-teal transition-all duration-300 sm:text-sm placeholder-gray-400"
                  value={coverLetter}
                  onChange={e => setCoverLetter(e.target.value)}
                  placeholder="Tell us why you're a great fit for this role..."
                />
              </div>
              <div>
                <label htmlFor="resume" className="block text-base font-semibold text-gray-700 mb-2">
                  Upload Resume (PDF only)
                </label>
                <input
                  id="resume"
                  type="file"
                  accept="application/pdf"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary-blue hover:file:bg-blue-100"
                  onChange={e => setResume(e.target.files[0])}
                />
              </div>
              <button
                type="button"
                onClick={apply}
                className="w-full sm:w-auto flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-accent-teal rounded-lg shadow-lg hover:bg-teal-400 transition-all duration-200 transform hover:scale-105 active:scale-95 space-x-3"
              >
                <EnvelopeIcon className="w-5 h-5" />
                <span>Submit Application</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}


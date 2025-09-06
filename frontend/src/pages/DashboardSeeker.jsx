import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Link } from 'react-router-dom';

const ApplicationStatusTracker = ({ currentStatus }) => {
  const statuses = ['SUBMITTED', 'REVIEWED', 'ACCEPTED', 'REJECTED'];
  const isRejected = currentStatus === 'REJECTED';
  const activeIndex = statuses.indexOf(currentStatus);

  const getStatusNode = (status, index) => {
    const isActive = index <= activeIndex;
    let colorClass = 'bg-gray-300';
    if (isRejected && status === 'REJECTED') {
      colorClass = 'bg-red-500';
    } else if (isActive) {
      colorClass = 'bg-green-500';
    }
    return (
      <div key={status} className="flex items-center">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs ${colorClass}`}>
          {isRejected && status === 'REJECTED' ? '!' : index + 1}
        </div>
        <p className={`ml-2 text-sm ${isActive || isRejected ? 'font-semibold text-gray-700' : 'text-gray-400'}`}>
          {status.charAt(0) + status.slice(1).toLowerCase()}
        </p>
      </div>
    );
  };

  const getConnector = (index) => {
    const isActive = index < activeIndex;
    let colorClass = 'bg-gray-300';
    if (!isRejected && isActive) {
      colorClass = 'bg-green-500';
    }
    return <div key={`conn-${index}`} className={`flex-1 h-1 mx-2 ${colorClass}`} />;
  };

  // Filter out REJECTED from the main flow unless it's the current status
  const flowStatuses = isRejected ? ['SUBMITTED', 'REJECTED'] : ['SUBMITTED', 'REVIEWED', 'ACCEPTED'];

  return (
    <div className="flex items-center w-full mt-4">
      {flowStatuses.map((status, index) => (
        <React.Fragment key={status}>
          {index > 0 && getConnector(index - 1)}
          {getStatusNode(status, statuses.indexOf(status))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function DashboardSeeker() {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
         const res = await client.get('/applications/');
        setApps(res.data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="container mx-auto p-6 font-poppins">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">My Applications</h3>
      {apps.length > 0 ? (
        <div className="space-y-6">
          {apps.map((app) => (
            <div key={app.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                  <p className="text-xl font-bold text-primary-blue">{app.job_title}</p>
                  <p className="text-sm text-gray-500 mt-1">Applied on {new Date(app.created_at).toLocaleDateString()}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : 
                      app.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                    {app.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-gray-600 mb-2">Application Progress:</p>
                <ApplicationStatusTracker currentStatus={app.status} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <p className="text-gray-600">You haven't applied to any jobs yet.</p>
            <Link to="/jobs" className="mt-4 inline-block px-6 py-2 text-sm font-semibold bg-primary-blue text-white rounded-full">
              Find Jobs
            </Link>
        </div>
      )}
    </div>
  );
}
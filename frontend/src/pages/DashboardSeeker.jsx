import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Container, Table } from 'react-bootstrap';

export default function DashboardSeeker() {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    client.get('/applications/').then(res => setApps(res.data));
  }, []);
  return (
    <Container className="py-4">
      <h3>My Applications</h3>
      <Table bordered>
        <thead><tr><th>Job</th><th>Status</th><th>Applied</th></tr></thead>
        <tbody>
          {apps.map(a => (<tr key={a.id}><td>{a.job_title}</td><td>{a.status}</td><td>{new Date(a.created_at).toLocaleString()}</td></tr>))}
        </tbody>
      </Table>
    </Container>
  );
}
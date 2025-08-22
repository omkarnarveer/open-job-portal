import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../api/client';
import { Container, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../auth/AuthContext';

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    client.get(`/jobs/${id}/`).then(res => setJob(res.data));
  }, [id]);

  const apply = async () => {
    const formData = new FormData();
    formData.append('job', id);
    formData.append('cover_letter', coverLetter);
    await client.post('/applications/', formData, { headers: { 'Content-Type': 'multipart/form-data' }});
    setMessage('Application submitted!');
  };

  if (!job) return null;
  return (
    <Container className="py-4">
      <h3>{job.title}</h3>
      <p><strong>Location:</strong> {job.location} • <strong>Type:</strong> {job.job_type}</p>
      <p>{job.description}</p>
      {message && <Alert variant="success">{message}</Alert>}
      {user?.role === 'JOB_SEEKER' && !job.is_filled && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Cover Letter</Form.Label>
            <Form.Control as="textarea" rows={5} value={coverLetter} onChange={e => setCoverLetter(e.target.value)} />
          </Form.Group>
          <Button onClick={apply}>Apply</Button>
        </>
      )}
    </Container>
  );
}
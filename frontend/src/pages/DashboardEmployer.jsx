import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';

export default function DashboardEmployer() {
  const [jobs, setJobs] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', requirements: '', location: '', job_type: 'FULL_TIME' });

  const load = async () => {
    const res = await client.get('/jobs/');
    setJobs(res.data.filter(j => j.employer_name)); // all; would filter by owner server-side in prod
  };
  useEffect(() => { load(); }, []);

  const createJob = async () => {
    await client.post('/jobs/', form);
    setShow(false);
    setForm({ title: '', description: '', requirements: '', location: '', job_type: 'FULL_TIME' });
    load();
  };

  const markFilled = async (id) => {
    await client.post(`/jobs/${id}/mark_filled/`);
    load();
  };

  const remove = async (id) => {
    await client.delete(`/jobs/${id}/`);
    load();
  };

  return (
    <Container className="py-4">
      <h3>My Job Listings</h3>
      <Button className="mb-3" onClick={() => setShow(true)}>Post Job</Button>
      <Table bordered>
        <thead><tr><th>Title</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {jobs.map(j => (
            <tr key={j.id}>
              <td>{j.title}</td>
              <td>{j.location}</td>
              <td>{j.is_filled ? 'Filled' : 'Open'}</td>
              <td>
                {!j.is_filled && <Button size="sm" onClick={() => markFilled(j.id)}>Mark filled</Button>}{' '}
                <Button size="sm" variant="danger" onClick={() => remove(j.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton><Modal.Title>Post job</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={5} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Requirements</Form.Label>
              <Form.Control as="textarea" rows={3} value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Location</Form.Label>
              <Form.Control value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Job Type</Form.Label>
              <Form.Select value={form.job_type} onChange={e => setForm({ ...form, job_type: e.target.value })}>
                <option value="FULL_TIME">Full-time</option>
                <option value="PART_TIME">Part-time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </Form.Select>
            </Form.Group>
            <Button onClick={createJob}>Create</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
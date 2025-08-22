import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [q, setQ] = useState('');
  const [jobType, setJobType] = useState('');

  const load = async () => {
    const params = {};
    if (q) params.search = q;
    const res = await client.get('/jobs/', { params });
    setJobs(jobType ? res.data.filter(j => j.job_type === jobType) : res.data);
  };
  useEffect(() => { load(); }, []); // initial load

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control placeholder="Search by keyword or location" value={q} onChange={e => setQ(e.target.value)} />
        </Col>
        <Col md={3}>
          <Form.Select value={jobType} onChange={e => setJobType(e.target.value)}>
            <option value="">All types</option>
            <option value="FULL_TIME">Full-time</option>
            <option value="PART_TIME">Part-time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERNSHIP">Internship</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Button onClick={load}>Search</Button>
        </Col>
      </Row>
      <Row>
        {jobs.map(j => (
          <Col md={4} key={j.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{j.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{j.location} • {j.job_type}</Card.Subtitle>
                <Card.Text>{j.description.slice(0, 120)}...</Card.Text>
                <Button as={Link} to={`/jobs/${j.id}`}>View</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
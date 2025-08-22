import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'JOB_SEEKER' });
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      nav('/login');
    } catch (e) {
      setError('Registration failed');
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h3>Register</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="JOB_SEEKER">Job Seeker</option>
                <option value="EMPLOYER">Employer</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit">Create account</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
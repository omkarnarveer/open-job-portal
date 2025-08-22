import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css'; // optional styles

export default function Home() {
  return (
    <section className="home-hero d-flex align-items-center">
      <Container className="text-center">
        <h1 className="display-4 fw-bold mb-3">Find Your Dream Job Today</h1>
        <p className="lead mb-4">
          Browse thousands of opportunities from top employers and take the next step in your career.
        </p>
        <Button as={Link} to="/jobs" size="lg" variant="primary">
          Browse Jobs
        </Button>
      </Container>
    </section>
  );
}
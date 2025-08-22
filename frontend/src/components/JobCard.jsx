import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * JobCard component
 * @param {Object} props
 * @param {Object} props.job - Job object from the API
 * @param {Function} [props.onApply] - Optional callback for inline "Apply" button
 */
export default function JobCard({ job, onApply }) {
  const {
    id,
    title,
    description,
    location,
    job_type,
    is_filled,
    employer_name,
    created_at
  } = job;

  const shortDesc =
    description.length > 120 ? description.slice(0, 120) + '…' : description;

  const jobTypeBadge = () => {
    const typeMap = {
      FULL_TIME: 'success',
      PART_TIME: 'primary',
      CONTRACT: 'warning',
      INTERNSHIP: 'info'
    };
    return <Badge bg={typeMap[job_type] || 'secondary'}>{job_type}</Badge>;
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {location} • {jobTypeBadge()}
        </Card.Subtitle>
        <Card.Text>{shortDesc}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Posted by {employer_name} on {new Date(created_at).toLocaleDateString()}
          </small>
          {is_filled ? (
            <Badge bg="secondary">Filled</Badge>
          ) : onApply ? (
            <Button size="sm" onClick={() => onApply(job)}>
              Apply
            </Button>
          ) : (
            <Button as={Link} to={`/jobs/${id}`} size="sm">
              View
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
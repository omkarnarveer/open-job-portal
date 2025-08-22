import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Image } from "react-bootstrap";
import client from "../api/client";
import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company_name: "",
    avatar: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Load current profile
  useEffect(() => {
    if (user) {
      client
        .get("/auth/me/")
        .then((res) => {
          const { first_name, last_name, email, phone, company_name, avatar } =
            res.data;
          setForm((f) => ({
            ...f,
            first_name,
            last_name,
            email,
            phone,
            company_name,
          }));
          setPreview(avatar || null);
        })
        .catch(() => setError("Failed to load profile."));
    }
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((f) => ({ ...f, avatar: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      await client.put("/auth/me/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4">My Profile</h2>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Avatar</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleAvatarChange} />
              {preview && (
                <div className="mt-3 text-center">
                  <Image src={preview} roundedCircle width={120} height={120} />
                </div>
              )}
            </Form.Group>

            <Button type="submit" variant="primary" className="me-2">
              Save Changes
            </Button>
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
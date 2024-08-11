import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      if (response.data.success) {
        onLogin(response.data.token);
        setMessage('Login successful!');
      } else {
        setMessage('Invalid credentials.');
      }
    } catch (error) {
      setMessage('Error logging in.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{marginBottom:100}}>
      <Row>
        <Col>
          <Card className="p-4 shadow-lg">
            <h2 className="text-center mb-4">Admin Login</h2>
            {message && <Alert variant="info">{message}</Alert>}
            <Form>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="button" className="w-100" onClick={handleLogin}>
                Login
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;

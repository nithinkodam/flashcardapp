import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './Footer.css'; // Import custom CSS for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="text-center" style={{marginTop:29}}>
          <Col md={6} className="mb-3">
            <h5>Flashcard Learning Tool</h5>
            <p>&copy; 2024 All Rights Reserved</p>
          </Col>
          <Col md={6} className="mb-3">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FaGithub size={30} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={30} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={30} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

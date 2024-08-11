import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Container, Dropdown, ListGroup, Button, Alert } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminDashboard = ({ onLogout }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/flashcards', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFlashcards(response.data);
    } catch (error) {
      setMessage('Error fetching flashcards.');
    }
  };

  const handleDeleteFlashcard = async (id) => {
    // Use SweetAlert2 for confirmation
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/flashcards/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire('Deleted!', 'Your flashcard has been deleted.', 'success');
        fetchFlashcards(); // Refresh the list after deletion
      } catch (error) {
        Swal.fire('Error!', 'There was an error deleting the flashcard.', 'error');
      }
    }
  };

  const handleAddFlashcard = () => {
    navigate('/add-flashcard');
  };

  const handleUpdateFlashcard = (id) => {
    navigate(`/update-flashcard/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout(); // Notify parent to update login state
  };

  return (
    <div style={{marginBottom:40}}>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>Admin Dashboard</Navbar.Brand>
          <Nav className="ms-auto">
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                <FaUserCircle size={30} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleAddFlashcard}>Add Flashcard</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        {message && <Alert variant="danger">{message}</Alert>}
        <h3>Flashcards</h3>
        <ListGroup>
          {flashcards.map((card) => (
            <ListGroup.Item key={card.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Q:</strong> <b>{card.question}</b><br />
                <strong>A:</strong> {card.answer}
              </div>
              <div>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => handleUpdateFlashcard(card.id)}
                >
                  Update
                </Button>
                <Button variant="danger" onClick={() => handleDeleteFlashcard(card.id)}>
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default AdminDashboard;

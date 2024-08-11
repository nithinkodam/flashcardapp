import React, { useState, useEffect } from 'react';
import Flashcard from '../components/Flashcard';
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/allflashcards');
        setFlashcards(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching flashcards.');
        setLoading(false);
      }
    };
    
    fetchFlashcards();
  }, []);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(flashcards.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage + flashcards.length) % flashcards.length);
  };

  const getCurrentFlashcards = () => {
    const start = Math.floor(currentIndex / itemsPerPage) * itemsPerPage;
    return flashcards.slice(start, start + itemsPerPage);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (flashcards.length === 0) return <p>No flashcards available.</p>;

  return (
    <Container className="my-5" style={{marginLeft:185}}>
      <Row className="justify-content-center">
        {getCurrentFlashcards().map((flashcard) => (
          <Col key={flashcard.id} md={4} className="mb-4" style={{}}>
            <Flashcard
              question={flashcard.question}
              answer={flashcard.answer}
            />
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center my-3">
        <Col md={4} className="text-center" style={{paddingLeft:530,paddingRight:60}}>
          <Button 
            variant="outline-primary" 
            onClick={handlePrevious} 
            disabled={currentIndex === 0}
          >
            <FaArrowLeft />
          </Button>
        </Col>
        <Col>
          <Button 
            // style={{marginRight:100}}
            variant="outline-primary" 
            onClick={handleNext} 
            disabled={currentIndex >= flashcards.length - itemsPerPage}
            className="mx-3"
          >
            <FaArrowRight />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

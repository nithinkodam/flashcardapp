import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateFlashcard = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the flashcard details when the component mounts
    const fetchFlashcard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/flashcards/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setQuestion(response.data.question);
        setAnswer(response.data.answer);
      } catch (error) {
        setMessage('Error fetching flashcard.');
      }
    };

    fetchFlashcard();
  }, [id]);

  const handleUpdateFlashcard = async () => {
    // Validation checks
    if (!question.trim() || !answer.trim()) {
      setError('Both question and answer fields are required.');
      return;
    }

    const wordCount = answer.trim().split(/\s+/).length;
    if (wordCount > 220) {
      setError('Answer cannot exceed 220 words.');
      return;
    }

    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/flashcards/${id}`, 
        { question, answer },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Show success message
      Swal.fire({
        title: 'Updated!',
        text: 'Your flashcard has been updated successfully.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/dashboard'); // Navigate back to the dashboard after updating
      });

    } catch (error) {
    //   setMessage('Error updating flashcard.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Flashcard</h2>
      {message && <p>{message}</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="form-group">
        <label>Question</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Answer</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleUpdateFlashcard}>
        Update Flashcard
      </button>
    </div>
  );
};

export default UpdateFlashcard;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddFlashcard = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddFlashcard = async () => {
    // Validation checks
    if (!question.trim() || !answer.trim()) {
      setError('Both question and answer fields are required.');
      return;
    }

    const wordCount = answer.split(/\s+/).length; // Count words correctly
    if (wordCount > 220) {
      setError('Answer cannot exceed 220 words.');
      return;
    }

    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/flashcards', 
        { question, answer },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      Swal.fire({
        title: 'Success!',
        text: 'Flashcard added successfully.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then(() => {
        setQuestion('');
        setAnswer('');
        navigate('/dashboard'); // Navigate back to the dashboard after adding
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error adding the flashcard.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Flashcard</h2>
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
      <button className="btn btn-primary mt-3" onClick={handleAddFlashcard} style={{marginBottom:160}}>
        Add Flashcard
      </button>
    </div>
  );
};

export default AddFlashcard;

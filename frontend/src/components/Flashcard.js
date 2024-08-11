import React, { useState } from 'react';
import './Flashcaard.css'; // Import the custom CSS file

const Flashcard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const Answer="Answer:";
  const Question="Question:";
  const handleClick = () => {
    setIsFlipped(!isFlipped);
    // setShowAnswer(false);
    console.log(isFlipped)
    setTimeout(() => {
      setShowAnswer(!isFlipped);
    }, 180); // 0.2 seconds delay
  };

  return (
    <div className={`flashcard-container ${isFlipped ? 'flipped' : ''}`} onClick={handleClick} style={{marginTop:70}}>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        <div className="flashcard-front">
          <b className={`rev ${showAnswer? 'flipped': '' }`}>{showAnswer? Answer:Question}</b>
          <p className={`flashcard-text ${showAnswer? 'flipped':''}`}>{showAnswer ? answer : question}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;

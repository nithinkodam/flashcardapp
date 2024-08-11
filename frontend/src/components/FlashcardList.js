// src/components/FlashcardList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Flashcard from "./Flashcard";

const FlashcardList = ({ onSelectCard }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/flashcards");
        setFlashcards(res.data);
      } catch (error) {
        console.error("Error fetching flashcards", error);
      }
    };
    fetchFlashcards();
  }, []);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevCard = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  const handleCardClick = () => {
    onSelectCard(flashcards[currentIndex]);
  };

  return (
    <div>
      {flashcards.length > 0 && (
        <>
          <Flashcard flashcard={flashcards[currentIndex]} onClick={handleCardClick} />
          <button onClick={prevCard}>Previous</button>
          <button onClick={nextCard}>Next</button>
        </>
      )}
    </div>
  );
};

export default FlashcardList;

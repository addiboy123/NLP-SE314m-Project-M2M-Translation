import React, { useState } from 'react';
import './FlipButton.css';

const FlipButton = ({ onFlip }) => {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleClick = () => {
    setIsFlipping(true);
    onFlip();
    
    setTimeout(() => {
      setIsFlipping(false);
    }, 500);
  };

  return (
    <div className="flip-button-container">
      <button 
        className={`flip-button ${isFlipping ? 'flipping' : ''}`}
        onClick={handleClick}
      >
        <div className="flip-icon">
          <span className="arrow-up">→</span>
          <span className="arrow-down">←</span>
        </div>
      </button>
    </div>
  );
};

export default FlipButton;
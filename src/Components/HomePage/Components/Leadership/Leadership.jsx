import React from 'react';
import './Leadership.css';

const Leadership = () => {
  const leadershipWords = [
    "Career", "Life", "Executive", "Business", "Health & Wellness",
    "Finance", "Performance", "Academic", "Entrepreneurship",
    "Spiritual or Faith-Based", "Community", "Youth"
  ];

  const Word = ({ word }) => {
    return (
      <div className="word">
        <span>{word}</span>
      </div>
    );
  };

  return (
    <div className="leadership-container flex-column">
      <div className="leadership-header">
        <span>LEADERSHIP AND GUIDANCE</span>
      </div>
      <div className="leadership-main-section">
        <div className="leadership-writeup">
          <h1>MENTORSHIP AND COACHING</h1>
          <p>
            Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Vorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
            libero et velit interdum, ac aliquet odio mattis.Vorem ipsum dolor
            sit amet, consectetur adipiscing elit. Nunc vulputate libero et
            velit interdum, ac aliquet odio mattis.
          </p>
        </div>
        <div className="leadership-words flex-column">
          <div className="word-container">
            {leadershipWords.map((word, index) => (
              <Word key={index} word={word} />
            ))}
          </div>
          <div className="leadership-button">
            <button className="dark-bg-btn">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leadership;

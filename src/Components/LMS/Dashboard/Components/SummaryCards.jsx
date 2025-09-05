import React from 'react';
import { Link } from 'react-router-dom';

const SummaryCards = ({ summaryData }) => {
  const handleCardClick = (path) => {
    // Navigation is handled by Link components
  };

  return (
    <div className="summary-cards">
      {summaryData.map((card) => (
        <div key={card.id} className="summary-card" onClick={() => handleCardClick(card.path)}>
          <div className="card-header">
            <div className="card-icon">{card.icon}</div>
            <div className="card-title">{card.title}</div>
          </div>
          <div className="card-content">
            <div className="card-number">{card.number}</div>
            <div className="card-label">{card.label}</div>
          </div>
          <div className="card-footer">
            <div className="card-status">{card.status}</div>
            <Link to={card.path} className="card-link">
              {card.linkText} →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;

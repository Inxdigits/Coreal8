import React from 'react';
import { Link } from 'react-router-dom';

const CounselingSection = ({ counselingData, searchQuery }) => {
  const filteredCounselingData = counselingData.filter(counseling => 
    counseling.nextSession.toLowerCase().includes(searchQuery.toLowerCase()) ||
    counseling.lastAttended.toLowerCase().includes(searchQuery.toLowerCase()) ||
    counseling.sessions.toLowerCase().includes(searchQuery.toLowerCase()) ||
    counseling.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="counseling-section">
      <div className="section-header">
        <h2 className="section-title">Counseling Services</h2>
        <Link to="/lms/counseling" className="view-all-link">View All →</Link>
      </div>
      <div className="counseling-grid">
        {filteredCounselingData.map((counseling) => (
          <div key={counseling.id} className="counseling-card">
            <div className="counseling-content">
              <h3 className="counseling-title">{counseling.title}</h3>
              <div className="counseling-details">
                <div className="detail-item">
                  <span className="detail-label">Next Session:</span>
                  <span className="detail-value">{counseling.nextSession}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Attended:</span>
                  <span className="detail-value">{counseling.lastAttended}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Sessions:</span>
                  <span className="detail-value">{counseling.sessions}</span>
                </div>
              </div>
              <div className="counseling-status">
                <span className={`status-badge ${counseling.status.toLowerCase().replace(' ', '-')}`}>
                  {counseling.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounselingSection;

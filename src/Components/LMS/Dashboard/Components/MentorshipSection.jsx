import React from 'react';
import { Link } from 'react-router-dom';

const MentorshipSection = ({ mentorshipData, searchQuery }) => {
  const filteredMentorshipData = mentorshipData.filter(mentorship => 
    mentorship.nextSession.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentorship.lastAttended.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentorship.sessions.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentorship.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mentorship-section">
      <div className="section-header">
        <h2 className="section-title">My Mentorship</h2>
        <Link to="/lms/mentorship" className="view-all-link">View All →</Link>
      </div>
      <div className="mentorship-grid">
        {filteredMentorshipData.map((mentorship) => (
          <div key={mentorship.id} className="mentorship-card">
            <div className="mentorship-content">
              <h3 className="mentorship-title">{mentorship.title}</h3>
              <div className="mentorship-details">
                <div className="detail-item">
                  <span className="detail-label">Next Session:</span>
                  <span className="detail-value">{mentorship.nextSession}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Attended:</span>
                  <span className="detail-value">{mentorship.lastAttended}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Sessions:</span>
                  <span className="detail-value">{mentorship.sessions}</span>
                </div>
              </div>
              <div className="mentorship-status">
                <span className={`status-badge ${mentorship.status.toLowerCase().replace(' ', '-')}`}>
                  {mentorship.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorshipSection;

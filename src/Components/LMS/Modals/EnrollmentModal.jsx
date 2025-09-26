import React from 'react';
import './EnrollmentModal.css';

const EnrollmentModal = ({ isOpen, onClose, courseTitle, onUnenroll, isEnrolled }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="enrollment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="success-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M20 6L9 17L4 12" 
                stroke="#059669" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="modal-title">Course Enrolled Successfully!</h2>
        </div>
        
        <div className="enrollment-modal-content">
          <p className="modal-message">
            You have successfully enrolled in <strong>{courseTitle}</strong>. 
            You can now start learning and track your progress.
          </p>
          
          <div className="modal-actions">
            <button className="start-learning-btn" onClick={onClose}>
              Start Learning
            </button>
            {isEnrolled && (
              <button className="unenroll-btn" onClick={onUnenroll}>
                Unenroll Course
              </button>
            )}
          </div>
        </div>
        
        <button className="modal-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EnrollmentModal;

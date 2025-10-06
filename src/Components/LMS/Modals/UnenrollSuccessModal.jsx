import React from 'react';
import './UnenrollSuccessModal.css';

const UnenrollSuccessModal = ({ isOpen, onClose, courseTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="unenroll-success-modal" onClick={(e) => e.stopPropagation()}>
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
          <h2 className="modal-title">Course Unenrolled Successfully!</h2>
        </div>
        
        <div className="us-modal-content">
          <p className="modal-message">
            You have successfully unenrolled from <strong>{courseTitle}</strong>. 
            Your progress has been removed and you can re-enroll anytime to start fresh.
          </p>
          
          <div className="modal-actions">
            <button className="ok-btn" onClick={onClose}>
              OK
            </button>
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

export default UnenrollSuccessModal;

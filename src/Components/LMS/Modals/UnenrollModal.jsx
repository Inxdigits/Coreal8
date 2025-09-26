import React from 'react';
import './UnenrollModal.css';

const UnenrollModal = ({ isOpen, onClose, courseTitle, onConfirmUnenroll }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="unenroll-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="warning-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                stroke="#dc2626" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="modal-title">Unenroll from Course?</h2>
        </div>
        
        <div className="unenroll-modal-content">
          <p className="modal-message">
            Are you sure you want to unenroll from <strong>{courseTitle}</strong>? 
            This action will remove all your progress and you'll need to re-enroll to continue learning.
          </p>
          
          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="confirm-unenroll-btn" onClick={onConfirmUnenroll}>
              Yes, Unenroll
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

export default UnenrollModal;

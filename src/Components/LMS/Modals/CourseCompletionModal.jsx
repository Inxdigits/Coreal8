import React from 'react';
import './CourseCompletionModal.css';

const CourseCompletionModal = ({ isOpen, onClose, courseTitle, course, onGoToMyCourses }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="course-completion-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
       
          <h3 className="course-completed-title">Course Completed!</h3>
        </div>
        
        <div className="cc-modal-content">
          <p className="modal-message">
            You have successfully completed <strong>{courseTitle}</strong>! 
            {course && course.certificate === 'Available' ? 
              ' Your certificate is now available and you can view it anytime from your completed courses.' : 
              ' Great job on completing this course!'
            }
          </p>
          
          <div className="modal-actions">
            <button className="go-to-courses-btn" onClick={onGoToMyCourses}>
              Go to My Courses
            </button>
            <button className="close-btn" onClick={onClose}>
              Close
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

export default CourseCompletionModal;

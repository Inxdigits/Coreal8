import React, { useState } from 'react';

const PrivacySection = ({
  dataVisibility,
  onDataVisibilityChange,
  onSavePreferences,
  onRequestAccountDeletion
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      onRequestAccountDeletion();
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="privacy-section">
      <h2 className="section-title">Privacy & Data</h2>
      
      {/* Data Visibility Section */}
      <div className="privacy-subsection">
        <h3 className="subsection-title">Data Visibility</h3>
        <p className="subsection-description">
          Control how your activity is used and who can see your engagement.
        </p>
        
        <div className="privacy-options">
          <div className="privacy-option">
            <div className="option-content">
              <h4 className="option-title">Allow mentors/coaches to see my session history</h4>
              <p className="option-description">
                Enabling this helps personalize your experience during mentorship and coaching.
              </p>
            </div>
            <div className="toggle-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={dataVisibility.sessionHistory}
                  onChange={(e) => onDataVisibilityChange('sessionHistory', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="privacy-option">
            <div className="option-content">
              <h4 className="option-title">Allow platform to use anonymized learning data for research</h4>
              <p className="option-description">
                Your name and identity are never included. This helps improve content.
              </p>
            </div>
            <div className="toggle-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={dataVisibility.anonymizedData}
                  onChange={(e) => onDataVisibilityChange('anonymizedData', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <button className="save-preferences-btn" onClick={onSavePreferences}>
          Save Preferences
        </button>
      </div>

      {/* Delete My Account Section */}
      <div className="privacy-subsection">
        <h3 className="subsection-title">Delete My Account</h3>
        <p className="subsection-description">
          Permanently remove your account and all related data.
        </p>
        
        <div className="warning-box">
          <div className="warning-icon">⚠️</div>
          <div className="warning-text">
            This action is irreversible. All your data, including sessions, courses, progress, and saved resources will be permanently deleted.
          </div>
        </div>

        {!showDeleteConfirm ? (
          <button className="delete-account-btn" onClick={handleDeleteAccount}>
            Request Account Deletion
          </button>
        ) : (
          <div className="delete-confirmation">
            <p className="confirmation-text">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="confirmation-actions">
              <button className="cancel-delete-btn" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="confirm-delete-btn" onClick={handleDeleteAccount}>
                Yes, Delete My Account
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Terms, Privacy & Consent Section */}
      <div className="privacy-subsection">
        <h3 className="subsection-title">Terms, Privacy & Consent</h3>
        <p className="subsection-description">
          Your privacy matters. Learn more about how we use and protect your information.
        </p>
        
        <div className="policy-links">
          <a href="/privacy-policy" className="policy-link">
            <span>View Privacy Policy</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          
          <a href="/terms-of-service" className="policy-link">
            <span>View Terms of Service</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className="consent-message">
          <div className="consent-icon">ℹ️</div>
          <div className="consent-text">
            You agreed to these policies when creating your account.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySection;
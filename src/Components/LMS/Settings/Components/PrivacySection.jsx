import React, { useState } from 'react';

const PrivacySection = () => {
  const [dataVisibility, setDataVisibility] = useState({
    allowMentorsToSeeHistory: false,
    allowAnonymizedDataForResearch: false
  });

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDataVisibilityToggle = (key) => {
    setDataVisibility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSavePreferences = () => {
    // In a real app, this would save to backend
    console.log('Data visibility preferences saved:', dataVisibility);
    alert('Privacy preferences saved successfully!');
  };

  const handleRequestAccountDeletion = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDeletion = () => {
    // In a real app, this would initiate account deletion process
    console.log('Account deletion requested');
    alert('Account deletion request submitted. You will receive an email confirmation shortly.');
    setShowDeleteConfirmation(false);
  };

  const handleCancelDeletion = () => {
    setShowDeleteConfirmation(false);
  };

  const ToggleSwitch = ({ isOn, onToggle }) => (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isOn}
        onChange={onToggle}
      />
      <span className="toggle-slider"></span>
    </label>
  );

  return (
    <div className="privacy-section">
      <h2 className="section-title">Privacy & Data</h2>
      
      {/* Data Visibility Section */}
      <div className="privacy-subsection">
        <div className="subsection-header">
          <h3 className="subsection-title">Data Visibility</h3>
          <p className="subsection-description">
            Control how your activity is used and who can see your engagement.
          </p>
        </div>
        
        <div className="privacy-options">
          <div className="privacy-option">
            <div className="option-content">
              <h4 className="option-title">Allow mentors/coaches to see my session history</h4>
              <p className="option-description">
                Enabling this helps personalize your experience during mentorship and coaching.
              </p>
            </div>
            <ToggleSwitch
              isOn={dataVisibility.allowMentorsToSeeHistory}
              onToggle={() => handleDataVisibilityToggle('allowMentorsToSeeHistory')}
            />
          </div>

          <div className="privacy-option">
            <div className="option-content">
              <h4 className="option-title">Allow platform to use anonymized learning data for research</h4>
              <p className="option-description">
                Your name and identity are never included. This helps improve content.
              </p>
            </div>
            <ToggleSwitch
              isOn={dataVisibility.allowAnonymizedDataForResearch}
              onToggle={() => handleDataVisibilityToggle('allowAnonymizedDataForResearch')}
            />
          </div>
        </div>

        <button className="save-preferences-btn" onClick={handleSavePreferences}>
          Save Preferences
        </button>
      </div>

      {/* Delete Account Section */}
      <div className="privacy-subsection">
        <div className="subsection-header">
          <h3 className="subsection-title">Delete My Account</h3>
          <p className="subsection-description">
            Permanently remove your account and all related data.
          </p>
        </div>
        
        <div className="warning-box">
          <div className="warning-icon">ℹ️</div>
          <p className="warning-text">
            This action is irreversible. All your data, including sessions, courses, progress, and saved resources will be permanently deleted.
          </p>
        </div>

        <button className="delete-account-btn" onClick={handleRequestAccountDeletion}>
          Request Account Deletion
        </button>
      </div>

      {/* Terms, Privacy & Consent Section */}
      <div className="privacy-subsection">
        <div className="subsection-header">
          <h3 className="subsection-title">Terms, Privacy & Consent</h3>
          <p className="subsection-description">
            Your privacy matters. Learn more about how we use and protect your information.
          </p>
        </div>
        
        <div className="policy-links">
          <a href="#" className="policy-link">
            View Privacy Policy &gt;
          </a>
          <a href="#" className="policy-link">
            View Terms of Service &gt;
          </a>
        </div>

        <div className="consent-disclaimer">
          <div className="disclaimer-icon">ℹ️</div>
          <p className="disclaimer-text">
            You agreed to these policies when creating your account.
          </p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Confirm Account Deletion</h3>
            </div>
            <div className="modal-body">
              <div className="warning-box">
                <div className="warning-icon">⚠️</div>
                <p className="warning-text">
                  Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
                </p>
              </div>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleCancelDeletion}>
                Cancel
              </button>
              <button className="confirm-delete-btn" onClick={handleConfirmDeletion}>
                Yes, Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySection;
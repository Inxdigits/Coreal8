import React from 'react';

const SecuritySection = ({ 
  passwordData, 
  passwordVisibility, 
  twoFactorEnabled, 
  isChangingPassword, 
  onPasswordChange, 
  onChangePassword, 
  onCancelPassword, 
  onTwoFactorToggle, 
  onTogglePasswordVisibility 
}) => {
  return (
    <div className="security-section">
      <h2 className="section-title">Security & Login</h2>
      
      {/* Change Password Section */}
      <div className="password-section">
        <h3 className="subsection-title">Change Password</h3>
        <div className="password-form">
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <div className="password-input-container">
              <input
                type={passwordVisibility.oldPassword ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={onPasswordChange}
                placeholder="Enter old password"
                className="form-input password-input"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => onTogglePasswordVisibility('oldPassword')}
                disabled={isChangingPassword}
              >
                {passwordVisibility.oldPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <div className="password-input-container">
              <input
                type={passwordVisibility.newPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={onPasswordChange}
                placeholder="Enter new password"
                className="form-input password-input"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => onTogglePasswordVisibility('newPassword')}
                disabled={isChangingPassword}
              >
                {passwordVisibility.newPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-container">
              <input
                type={passwordVisibility.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={onPasswordChange}
                placeholder="Confirm new password"
                className="form-input password-input"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => onTogglePasswordVisibility('confirmPassword')}
                disabled={isChangingPassword}
              >
                {passwordVisibility.confirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <div className="password-actions">
            <button 
              className="save-btn" 
              onClick={onChangePassword}
              disabled={isChangingPassword}
            >
              {isChangingPassword ? 'Saving...' : 'Save'}
            </button>
            <button 
              className="cancel-btn" 
              onClick={onCancelPassword}
              disabled={isChangingPassword}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className="two-factor-section">
        <h3 className="subsection-title">Enable Two-Factor Authentication</h3>
        <p className="two-factor-description">
          For additional protection of your personal sessions and data, enable Two-Factor Authentication.
        </p>
        <div className="two-factor-content">
          <div className="email-info">
            <div className="email-label">Primary Email</div>
            <div className="email-description">Email used to send authentication code.</div>
          </div>
          <div className="toggle-container">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={onTwoFactorToggle}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;

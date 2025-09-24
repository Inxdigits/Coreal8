import React, { useState } from 'react';

const NotificationsSection = ({
  emailNotifications,
  inAppNotifications,
  language,
  timezone,
  onEmailNotificationChange,
  onInAppNotificationChange,
  onLanguageChange,
  onTimezoneChange,
  onSaveEmailChanges,
  onSaveInAppChanges,
  onSaveLanguageChanges,
  onSaveTimezoneChanges
}) => {
  return (
    <div className="notifications-section">
      <h2 className="section-title">Notifications & Preferences</h2>
      
      {/* Email Notifications Section */}
      <div className="notification-subsection">
        <h3 className="subsection-title">Email Notifications</h3>
        <p className="subsection-description">
          Control which updates and messages you receive via email.
        </p>
        
        <div className="notification-options">
          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">Session Reminders</h4>
              <p className="option-description">
                Get an email before upcoming courses, coaching, or counseling sessions.
              </p>
            </div>
            <div className="toggle-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={emailNotifications.sessionReminders}
                  onChange={(e) => onEmailNotificationChange('sessionReminders', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">Course Updates</h4>
              <p className="option-description">
                Be notified when new lessons, assignments, or live classes are added.
              </p>
            </div>
            <div className="toggle-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={emailNotifications.courseUpdates}
                  onChange={(e) => onEmailNotificationChange('courseUpdates', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">Promotions & Offers</h4>
              <p className="option-description">
                Receive occasional discounts and announcements.
              </p>
            </div>
            <div className="toggle-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={emailNotifications.promotionsOffers}
                  onChange={(e) => onEmailNotificationChange('promotionsOffers', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">Community Announcements</h4>
              <p className="option-description">
                Stay updated with platform-wide news and feature launches.
              </p>
            </div>
            <div className="toggle-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={emailNotifications.communityAnnouncements}
                  onChange={(e) => onEmailNotificationChange('communityAnnouncements', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <button className="save-changes-btn" onClick={onSaveEmailChanges}>
          Save Changes
        </button>
      </div>

      {/* In-App Notifications Section */}
      <div className="notification-subsection">
        <h3 className="subsection-title">In-App Notifications</h3>
        <p className="subsection-description">
          Choose which notifications you want to see inside the dashboard.
        </p>
        
        <div className="notification-options">
          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">Upcoming Session Alerts</h4>
              <p className="option-description">
                Reminder popup before coaching or counseling sessions.
              </p>
            </div>
            <div className="toggle-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={inAppNotifications.upcomingSessionAlerts}
                  onChange={(e) => onInAppNotificationChange('upcomingSessionAlerts', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">New Lesson Drops</h4>
              <p className="option-description">
                Be notified when a new lesson is released in a course.
              </p>
            </div>
            <div className="toggle-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={inAppNotifications.newLessonDrops}
                  onChange={(e) => onInAppNotificationChange('newLessonDrops', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">Assignment Deadlines</h4>
              <p className="option-description">
                Receive due date alerts for mentorship or course tasks.
              </p>
            </div>
            <div className="toggle-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={inAppNotifications.assignmentDeadlines}
                  onChange={(e) => onInAppNotificationChange('assignmentDeadlines', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">Live Event Reminders</h4>
              <p className="option-description">
                Alert 15 mins before a podcast stream or live class starts.
              </p>
            </div>
            <div className="toggle-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={inAppNotifications.liveEventReminders}
                  onChange={(e) => onInAppNotificationChange('liveEventReminders', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <button className="save-changes-btn" onClick={onSaveInAppChanges}>
          Save Changes
        </button>
      </div>

      {/* Language Section */}
      <div className="preference-subsection">
        <h3 className="subsection-title">Language</h3>
        <div className="dropdown-container">
          <select 
            className="preference-dropdown"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
          >
            <option value="en">English (default)</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
          </select>
        </div>
        <button className="save-changes-btn" onClick={onSaveLanguageChanges}>
          Save Changes
        </button>
      </div>

      {/* Time zone Section */}
      <div className="preference-subsection">
        <h3 className="subsection-title">Time zone</h3>
        <div className="dropdown-container">
          <select 
            className="preference-dropdown"
            value={timezone}
            onChange={(e) => onTimezoneChange(e.target.value)}
          >
            <option value="GMT+1">GMT+1 — West Africa Time (WAT)</option>
            <option value="GMT+0">GMT+0 — Greenwich Mean Time (GMT)</option>
            <option value="GMT-5">GMT-5 — Eastern Time (ET)</option>
            <option value="GMT-8">GMT-8 — Pacific Time (PT)</option>
            <option value="GMT+2">GMT+2 — Central European Time (CET)</option>
            <option value="GMT+5:30">GMT+5:30 — India Standard Time (IST)</option>
            <option value="GMT+9">GMT+9 — Japan Standard Time (JST)</option>
            <option value="GMT+10">GMT+10 — Australian Eastern Time (AET)</option>
          </select>
        </div>
        <button className="save-changes-btn" onClick={onSaveTimezoneChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default NotificationsSection;
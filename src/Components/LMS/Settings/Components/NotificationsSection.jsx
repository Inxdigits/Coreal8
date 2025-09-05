import React, { useState } from 'react';

const NotificationsSection = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    sessionReminders: true,
    courseUpdates: false,
    promotionsOffers: false,
    communityAnnouncements: false
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    upcomingSessionAlerts: true,
    newLessonDrops: false,
    assignmentDeadlines: false,
    liveEventReminders: false
  });

  const [language, setLanguage] = useState('english');
  const [timezone, setTimezone] = useState('GMT+1');

  const handleEmailNotificationToggle = (key) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInAppNotificationToggle = (key) => {
    setInAppNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveEmailChanges = () => {
    // In a real app, this would save to backend
    console.log('Email notification settings saved:', emailNotifications);
    alert('Email notification settings saved successfully!');
  };

  const handleSaveInAppChanges = () => {
    // In a real app, this would save to backend
    console.log('In-app notification settings saved:', inAppNotifications);
    alert('In-app notification settings saved successfully!');
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
    <div className="notifications-section">
      <h2 className="section-title">Notifications & Preferences</h2>
      
      {/* Email Notifications */}
      <div className="notification-subsection">
        <div className="subsection-header">
          <h3 className="subsection-title">Email Notifications</h3>
          <p className="subsection-description">
            Control which updates and messages you receive via email.
          </p>
        </div>
        
        <div className="notification-options">
          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">Session Reminders</h4>
              <p className="option-description">
                Get an email before upcoming courses, coaching, or counseling sessions.
              </p>
            </div>
            <ToggleSwitch
              isOn={emailNotifications.sessionReminders}
              onToggle={() => handleEmailNotificationToggle('sessionReminders')}
            />
          </div>

          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">Course Updates</h4>
              <p className="option-description">
                Be notified when new lessons, assignments, or live classes are added.
              </p>
            </div>
            <ToggleSwitch
              isOn={emailNotifications.courseUpdates}
              onToggle={() => handleEmailNotificationToggle('courseUpdates')}
            />
          </div>

          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">Promotions & Offers</h4>
              <p className="option-description">
                Receive occasional discounts and announcements.
              </p>
            </div>
            <ToggleSwitch
              isOn={emailNotifications.promotionsOffers}
              onToggle={() => handleEmailNotificationToggle('promotionsOffers')}
            />
          </div>

          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">Community Announcements</h4>
              <p className="option-description">
                Stay updated with platform-wide news and feature launches.
              </p>
            </div>
            <ToggleSwitch
              isOn={emailNotifications.communityAnnouncements}
              onToggle={() => handleEmailNotificationToggle('communityAnnouncements')}
            />
          </div>
        </div>

        <button className="save-changes-btn" onClick={handleSaveEmailChanges}>
          Save Changes
        </button>
      </div>

      {/* In-App Notifications */}
      <div className="notification-subsection">
        <div className="subsection-header">
          <h3 className="subsection-title">In-App Notifications</h3>
          <p className="subsection-description">
            Choose which notifications you want to see inside the dashboard.
          </p>
        </div>
        
        <div className="notification-options">
          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">Upcoming Session Alerts</h4>
              <p className="option-description">
                Reminder popup before coaching or counseling sessions.
              </p>
            </div>
            <ToggleSwitch
              isOn={inAppNotifications.upcomingSessionAlerts}
              onToggle={() => handleInAppNotificationToggle('upcomingSessionAlerts')}
            />
          </div>

          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">New Lesson Drops</h4>
              <p className="option-description">
                Be notified when a new lesson is released in a course.
              </p>
            </div>
            <ToggleSwitch
              isOn={inAppNotifications.newLessonDrops}
              onToggle={() => handleInAppNotificationToggle('newLessonDrops')}
            />
          </div>

          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">Assignment Deadlines</h4>
              <p className="option-description">
                Receive due date alerts for mentorship or course tasks.
              </p>
            </div>
            <ToggleSwitch
              isOn={inAppNotifications.assignmentDeadlines}
              onToggle={() => handleInAppNotificationToggle('assignmentDeadlines')}
            />
          </div>

          <div className="notification-option">
            <div className="option-content">
              <h4 className="option-title">Live Event Reminders</h4>
              <p className="option-description">
                Alert 15 mins before a podcast stream or live class starts.
              </p>
            </div>
            <ToggleSwitch
              isOn={inAppNotifications.liveEventReminders}
              onToggle={() => handleInAppNotificationToggle('liveEventReminders')}
            />
          </div>
        </div>

        <button className="save-changes-btn" onClick={handleSaveInAppChanges}>
          Save Changes
        </button>
      </div>

      {/* Language & Timezone */}
      <div className="preferences-section">
        <div className="preference-item">
          <h3 className="preference-title">Language</h3>
          <div className="preference-control">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="preference-select"
            >
              <option value="english">English (default)</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>
        </div>

        <div className="preference-item">
          <h3 className="preference-title">Time zone</h3>
          <div className="preference-control">
            <select 
              value={timezone} 
              onChange={(e) => setTimezone(e.target.value)}
              className="preference-select"
            >
              <option value="GMT+1">GMT+1 — West Africa Time (WAT)</option>
              <option value="GMT+0">GMT+0 — Greenwich Mean Time (GMT)</option>
              <option value="GMT-5">GMT-5 — Eastern Time (ET)</option>
              <option value="GMT-8">GMT-8 — Pacific Time (PT)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSection;
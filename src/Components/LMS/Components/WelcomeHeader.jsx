import React from 'react';
import { useUser } from '../../../context/UserContext.jsx';
import ProfileImage from '../../Shared/ProfileImage.jsx';

const WelcomeHeader = ({ pageTitle, pageSubtitle, searchQuery, onSearchChange, showSearch = true }) => {
  const { user } = useUser();
  return (
    <div className="lms-header">
      <div className="header-left">
        <h1 className="welcome-text">Welcome, {user?.name || 'User'}</h1>
        {pageTitle && <p className="page-subtitle">{pageSubtitle}</p>}
      </div>
      <div className="header-right">
        <div className="notification-icon">🔔</div>
        {showSearch && (
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery || ''}
              onChange={onSearchChange || (() => {})}
            />
          </div>
        )}
        <div className="user-profile">
          <div className="profile-image">
            <ProfileImage 
              user={user} 
              size={40} 
              className="header-profile-image"
              showInitials={true}
              fallbackImage="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
            />
          </div>
          <div className="profile-info">
            <div className="profile-name">{user?.name || 'User'}</div>
            <div className="profile-email">{user?.email || 'user@example.com'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;

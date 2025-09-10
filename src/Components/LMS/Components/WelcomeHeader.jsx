import React from 'react';

const WelcomeHeader = ({ user, pageTitle, pageSubtitle, searchQuery, onSearchChange, showSearch = true }) => {
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
            <img 
              src={user?.profileImage || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'} 
              alt="Profile" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="profile-initials" style={{ display: 'none' }}>
              {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
            </div>
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

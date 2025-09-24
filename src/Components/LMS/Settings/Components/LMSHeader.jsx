import React from 'react';

const LMSHeader = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="lms-header">
      <div className="header-left">
        <h1 className="page-title">Account Setting</h1>
      </div>
      <div className="header-right">
        <div className="notification-icon">🔔</div>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default LMSHeader;

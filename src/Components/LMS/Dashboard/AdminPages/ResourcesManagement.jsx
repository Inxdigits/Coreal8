import React from 'react';
import DashboardSidebar from '../Components/DashboardSidebar';
import './AdminPages.css';

const ResourcesManagement = () => {
  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="welcome-text">Resources Management</h1>
          </div>
          <div className="header-right">
            <div className="user-profile">
              <div className="profile-image">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" alt="Profile" />
              </div>
              <div className="profile-info">
                <div className="profile-name">Jane Doe</div>
                <div className="profile-role">Super Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          <div className="content-placeholder">
            <h2>Resources Management</h2>
            <p>Manage learning resources, upload materials, and organize content</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesManagement;

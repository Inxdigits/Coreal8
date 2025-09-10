import React, { useState, useEffect } from 'react';
import { auth } from '../../../../Firebase/Firebase.js';
import DashboardSidebar from '../Components/DashboardSidebar';
import './AdminPages.css';

const CourseManagement = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          name: user.displayName || 'User',
          email: user.email || 'user@example.com',
          profileImage: user.photoURL ? `${user.photoURL}?sz=40` : 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="welcome-text">Welcome, {user?.name || 'User'}</h1>
            <p className="page-subtitle">Course Management</p>
          </div>
          <div className="header-right">
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
                <div className="profile-role">Super Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          <div className="content-placeholder">
            <h2>Course Management</h2>
            <p>Manage courses, create new ones, and track course performance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;

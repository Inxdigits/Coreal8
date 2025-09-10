import React, { useState, useEffect } from 'react';
import { auth } from '../../../Firebase/Firebase.js';
import DashboardSidebar from './Components/DashboardSidebar';
import './Dashboard.css';
import courseIcon from '../../../Assets/LmsPageAssets/icon-courses.svg';
import mentorshipIcon from '../../../Assets/LmsPageAssets/icon-mentorship.svg';
import counselingIcon from '../../../Assets/LmsPageAssets/icon-counseling.svg';
import coachingIcon from '../../../Assets/LmsPageAssets/icon-coaching.svg';
import arrowIcon from '../../../Assets/LmsPageAssets/arrow.svg';

const Dashboard = () => {
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
          {/* Service Cards */}
          <div className="service-cards">
            {/* Courses Card */}
            <div className="service-card">
              <div className="service-title-row">
                <div className="service-icon"><img src={courseIcon} alt="course" /></div>
                <h3 className="service-title">Courses</h3>
              </div>
              <div className="service-content">
                <div className="service-count">1</div>
                <div className="service-subtitle-row">
                  <p className="service-subtitle">On-going courses</p>
                  <button className="service-button">
                    Enrol <img src={arrowIcon} alt="arrow" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mentorship Card */}
            <div className="service-card">
              <div className="service-title-row">
                <div className="service-icon"><img src={mentorshipIcon} alt="mentorship" /></div>
                <h3 className="service-title">Mentorship</h3>
              </div>
              <div className="service-content">
                <div className="service-count">0</div>
                <div className="service-subtitle-row">
                  <p className="service-subtitle">On-going mentorship</p>
                  <button className="service-button">
                    Apply <img src={arrowIcon} alt="arrow" />
                  </button>
                </div>
              </div>
            </div>

            {/* Counseling Card */}
            <div className="service-card">
              <div className="service-title-row">
                <div className="service-icon"><img src={counselingIcon} alt="counseling" /></div>
                <h3 className="service-title">Counseling</h3>
              </div>
              <div className="service-content">
                <div className="service-count">0</div>
                <div className="service-subtitle-row">
                  <p className="service-subtitle">On-going counseling</p>
                  <button className="service-button">
                    Apply <img src={arrowIcon} alt="arrow" />
                  </button>
                </div>
              </div>
            </div>

            {/* Coaching Card */}
            <div className="service-card">
              <div className="service-title-row">
                <div className="service-icon"><img src={coachingIcon} alt="coaching" /></div>
                <h3 className="service-title">Coaching</h3>
              </div>
              <div className="service-content">
                <div className="service-count">0</div>
                <div className="service-subtitle-row">
                  <p className="service-subtitle">On-going coaching</p>
                  <button className="service-button">
                    Apply <img src={arrowIcon} alt="arrow" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

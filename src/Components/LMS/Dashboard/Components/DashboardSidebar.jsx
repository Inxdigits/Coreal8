import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../../../context/UserContext.jsx';
import ProfileImage from '../../../Shared/ProfileImage.jsx';
import './DashboardSidebar.css';
import dashboardIcon from '../../../../Assets/LmsPageAssets/dashboard.svg';
import courseIcon from '../../../../Assets/LmsPageAssets/course.svg';
import programIcon from '../../../../Assets/LmsPageAssets/program.svg';
import blogIcon from '../../../../Assets/LmsPageAssets/blog.svg';
import podcastIcon from '../../../../Assets/LmsPageAssets/podcast.svg';
import resourcesIcon from '../../../../Assets/LmsPageAssets/resources.svg';
import accountIcon from '../../../../Assets/LmsPageAssets/account.svg';
import logoutIcon from '../../../../Assets/LmsPageAssets/logout.svg';
import logoIcon from '../../../../Assets/LmsPageAssets/logo.png';
import calendarIcon from '../../../../Assets/LmsPageAssets/calendar.svg';
const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();


  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: dashboardIcon },
    { id: 'my-courses', label: 'My Courses', path: '/my-courses', icon: courseIcon },
    { id: 'program-management', label: 'My Mentorship', path: '/admin/program-management', icon: programIcon },
    { id: 'blog-management', label: 'Coaching Sessions', path: '/admin/blog-management', icon: blogIcon },
    { id: 'podcast-management', label: 'Counseling Services', path: '/admin/podcast-management', icon: podcastIcon },
    { id: 'calendar', label: 'Calendar', path: '/lms/calendar', icon: calendarIcon },
    { id: 'resources-management', label: 'Resources', path: '/lms/resources', icon: resourcesIcon },
    { id: 'account-settings', label: 'Account Settings', path: '/admin/account-settings', icon: accountIcon },
    { id: 'logout', label: 'Logout', path: null, icon: logoutIcon }
  ];

  return (
    <div className="dashboard-sidebar">
      <div className="sidebar-content">
        {/* Logo Section */}  
        <div className="sidebar-header">
          <div className="">
          <img src={logoIcon} alt="logo" className="logo-icon" />
           
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          item.id === 'logout' ? (
            <button
              key={item.id}
              className={`nav-item logout-btn ${location.pathname === item.path ? 'active' : ''}`}
              onClick={handleLogout}
            >
              <img src={item.icon} alt={item.label} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </button>
          ) : (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <img src={item.icon} alt={item.label} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
          )
        ))}
      </nav>

        {/* User Profile Section */}
        {user && (
          <div className="user-profile-section">
            <div className="user-profile-image">
              <ProfileImage 
                user={user} 
                size={40} 
                className="sidebar-profile-image"
                showInitials={true}
                fallbackImage="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
              />
            </div>
            <div className="user-profile-info">
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;

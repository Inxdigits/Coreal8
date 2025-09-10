import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../../../../Firebase/Firebase.js';
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

const DashboardSidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          name: user.displayName || 'Jane Doe',
          email: user.email || 'janedoe@gmail.com',
          photoURL: user.photoURL || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: dashboardIcon },
    { id: 'course-management', label: 'Course Management', path: '/admin/course-management', icon: courseIcon },
    { id: 'program-management', label: 'Program Management', path: '/admin/program-management', icon: programIcon },
    { id: 'blog-management', label: 'Blog Management', path: '/admin/blog-management', icon: blogIcon },
    { id: 'podcast-management', label: 'Podcast Management', path: '/admin/podcast-management', icon: podcastIcon },
    { id: 'resources-management', label: 'Resources Management', path: '/admin/resources-management', icon: resourcesIcon },
    { id: 'account-settings', label: 'Account Settings', path: '/admin/account-settings', icon: accountIcon },
    { id: 'logout', label: 'Logout', path: '/logout', icon: logoutIcon }
  ];

  return (
    <div className="dashboard-sidebar">
      {/* Logo Section */}  
      <div className="sidebar-header">
        <div className="">
        <img src={logoIcon} alt="logo" className="logo-icon" />
         
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <img src={item.icon} alt={item.label} className="nav-icon" />
            <span className="nav-label">{item.label }</span>
          </Link>
        ))}
      </nav>

      {/* User Profile Section */}
      {user && (
        <div className="user-profile-section">
          <div className="user-profile-image">
            <img src={user.photoURL} alt="Profile" />
          </div>
          <div className="user-profile-info">
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;

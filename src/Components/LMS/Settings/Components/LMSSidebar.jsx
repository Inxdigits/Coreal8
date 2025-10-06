import React from 'react';
import { Link } from 'react-router-dom';

const LMSSidebar = ({ user, activeSection, onLogout }) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞', path: '/dashboard' },
    { id: 'courses', label: 'My Courses', icon: '🎓', path: '/lms/courses' },
    { id: 'mentorship', label: 'My Mentorship', icon: '👥', path: '/lms/mentorship' },
    { id: 'coaching', label: 'Coaching Sessions', icon: '👥➡️', path: '/lms/coaching' },
    { id: 'counseling', label: 'Counseling Services', icon: '👥', path: '/lms/counseling' },
    { id: 'calendar', label: 'Calendar', icon: '📅', path: '/lms/calendar' },
    { id: 'resources', label: 'Resources', icon: '⊞+', path: '/lms/resources' },
    { id: 'settings', label: 'Account Settings', icon: '👤', path: '/lms/settings' },
    { id: 'logout', label: 'Logout', icon: '↪️', path: null }
  ];

  return (
    <div className="lms-sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">C<span className="logo-8">8</span></div>
          <span className="logo-text">Coreal8</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {sidebarItems.map((item) => (
          item.id === 'logout' ? (
            <button
              key={item.id}
              className={`sidebar-nav-item logout-btn ${activeSection === item.id ? 'active' : ''}`}
              onClick={onLogout}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              <span className="sidebar-nav-label">{item.label}</span>
            </button>
          ) : (
            <Link
              key={item.id}
              to={item.path}
              className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              <span className="sidebar-nav-label">{item.label}</span>
            </Link>
          )
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="profile-image">
            <img 
              src={user?.profileImage} 
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
            <div className="profile-name">{user?.name}</div>
            <div className="profile-email">{user?.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSSidebar;

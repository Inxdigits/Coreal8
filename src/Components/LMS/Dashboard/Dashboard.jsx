import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../Firebase/Firebase.js';
import './Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Get current user from Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          name: user.displayName || 'User',
          email: user.email || 'user@example.com',
          profileImage: user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        });
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Mock data for summary cards
  const summaryData = {
    courses: { count: 1, label: 'On-going courses', button: 'Enrol >' },
    mentorship: { count: 0, label: 'On-going mentorship', button: 'Apply >' },
    counseling: { count: 0, label: 'On-going counseling', button: 'Apply >' },
    coaching: { count: 0, label: 'On-going coaching', button: 'Apply >' }
  };

  // Mock course data
  const courseData = {
    title: "The Visionary Leader's Blueprint",
    progress: 50,
    status: "In progress",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=120&fit=crop&crop=face"
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { id: 'courses', label: 'My Courses', icon: 'graduation-cap' },
    { id: 'mentorship', label: 'My Mentorship', icon: 'people' },
    { id: 'coaching', label: 'Coaching Sessions', icon: 'coaching' },
    { id: 'counseling', label: 'Counseling Services', icon: 'counseling' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar' },
    { id: 'resources', label: 'Resources', icon: 'resources' },
    { id: 'settings', label: 'Account Settings', icon: 'person' },
    { id: 'logout', label: 'Logout', icon: 'logout' }
  ];

  const getIcon = (iconName) => {
    const icons = {
      grid: '⊞',
      'graduation-cap': '🎓',
      people: '👥',
      coaching: '👥➡️',
      counseling: '👥',
      calendar: '📅',
      resources: '⊞+',
      person: '👤',
      logout: '↪️'
    };
    return icons[iconName] || '•';
  };

  const getCardIcon = (type) => {
    const cardIcons = {
      courses: '🎓',
      mentorship: '👥',
      counseling: '👥',
      coaching: '👥➡️'
    };
    return cardIcons[type] || '•';
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement search functionality here
  };

  const handleCardClick = (type) => {
    switch (type) {
      case 'courses':
        navigate('/courses');
        break;
      case 'mentorship':
        navigate('/mentoring');
        break;
      case 'counseling':
        navigate('/counseling');
        break;
      case 'coaching':
        navigate('/coaching');
        break;
      default:
        break;
    }
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
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
                className={`nav-item logout-btn ${activeSection === item.id ? 'active' : ''}`}
                onClick={handleLogout}
              >
                <span className="nav-icon">{getIcon(item.icon)}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.id}
                to={`/${item.id === 'dashboard' ? 'dashboard' : item.id}`}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="nav-icon">{getIcon(item.icon)}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            )
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="profile-image">
              <img src={user.profileImage} alt="Profile" />
            </div>
            <div className="profile-info">
              <div className="profile-name">{user.name}</div>
              <div className="profile-email">{user.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="welcome-text">Welcome Back, {user.name}</h1>
          </div>
          <div className="header-right">
            <div className="notification-icon">🔔</div>
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card courses" onClick={() => handleCardClick('courses')}>
            <div className="card-icon">{getCardIcon('courses')}</div>
            <div className="card-content">
              <div className="card-title">Courses</div>
              <div className="card-number">{summaryData.courses.count}</div>
              <div className="card-label">{summaryData.courses.label}</div>
              <button className="card-button">Enrol ></button>
            </div>
          </div>
          
          <div className="summary-card mentorship" onClick={() => handleCardClick('mentorship')}>
            <div className="card-icon">{getCardIcon('mentorship')}</div>
            <div className="card-content">
              <div className="card-title">Mentorship</div>
              <div className="card-number">{summaryData.mentorship.count}</div>
              <div className="card-label">{summaryData.mentorship.label}</div>
              <button className="card-button">Apply ></button>
            </div>
          </div>
          
          <div className="summary-card counseling" onClick={() => handleCardClick('counseling')}>
            <div className="card-icon">{getCardIcon('counseling')}</div>
            <div className="card-content">
              <div className="card-title">Counseling</div>
              <div className="card-number">{summaryData.counseling.count}</div>
              <div className="card-label">{summaryData.counseling.label}</div>
              <button className="card-button">Apply ></button>
            </div>
          </div>
          
          <div className="summary-card coaching" onClick={() => handleCardClick('coaching')}>
            <div className="card-icon">{getCardIcon('coaching')}</div>
            <div className="card-content">
              <div className="card-title">Coaching</div>
              <div className="card-number">{summaryData.coaching.count}</div>
              <div className="card-label">{summaryData.coaching.label}</div>
              <button className="card-button">Apply ></button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="content-left">
            {/* My Courses */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>My Courses</h3>
                <Link to="/courses" className="view-all-link">View all</Link>
              </div>
              <div className="course-item">
                <div className="course-thumbnail">
                  <img src={courseData.thumbnail} alt="Course" />
                </div>
                <div className="course-info">
                  <h4 className="course-title">{courseData.title}</h4>
                  <div className="course-status">{courseData.status}</div>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${courseData.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{courseData.progress}%</span>
                  </div>
                </div>
                <div className="course-arrow">→</div>
              </div>
            </div>

            {/* My Counseling */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>My Counseling</h3>
                <Link to="/counseling" className="view-all-link">View all</Link>
              </div>
              <div className="empty-state">
                <div className="empty-title">No Active Counseling Sessions</div>
                <div className="empty-description">You're not enrolled in a counseling program yet.</div>
                <button className="cta-button" onClick={() => navigate('/counseling')}>Start Counseling</button>
              </div>
            </div>

            {/* My Mentorship */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>My Mentorship</h3>
                <Link to="/mentoring" className="view-all-link">View all</Link>
              </div>
              <div className="empty-state">
                <div className="empty-title">No Active Mentorship Sessions</div>
                <div className="empty-description">You're not enrolled in a mentorship program yet.</div>
                <button className="cta-button" onClick={() => navigate('/mentoring')}>Explore Mentorships</button>
              </div>
            </div>

            {/* My Coaching */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>My Coaching</h3>
                <Link to="/coaching" className="view-all-link">View all</Link>
              </div>
              <div className="empty-state">
                <div className="empty-title">No Active Coaching Sessions</div>
                <div className="empty-description">You're not enrolled in a coaching program yet.</div>
                <button className="cta-button" onClick={() => navigate('/coaching')}>Book Coaching</button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="content-right">
            {/* My Calendar */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>My Calendar</h3>
              </div>
              <div className="empty-state">
                <div className="empty-title">Nothing in Calendar</div>
                <div className="empty-description">You have nothing in your calendar</div>
              </div>
            </div>

            {/* Events */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>Events</h3>
              </div>
              <div className="empty-state">
                <div className="empty-title">No Upcoming Event</div>
                <div className="empty-description">You have upcoming event.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../Firebase/Firebase.js';
import './LMSCalendar.css';

const LMSCalendar = () => {
  const [activeSection, setActiveSection] = useState('calendar');
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('day'); // 'day', 'week', 'month'
  const [emailReminder, setEmailReminder] = useState(true);
  const [inAppReminder, setInAppReminder] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          name: user.displayName || 'Jane Doe',
          email: user.email || 'janedoe@gmail.com',
          profileImage: user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        });
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

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

  const categories = [
    { id: 'mentorship', label: 'Mentorship', color: '#FFD700' },
    { id: 'counseling', label: 'Counseling', color: '#8B0000' },
    { id: 'coaching', label: 'Coaching', color: '#32CD32' },
    { id: 'courses', label: 'Courses', color: '#4169E1' }
  ];

  const events = [
    {
      id: 1,
      title: 'Module 3 Live Session',
      date: new Date(2024, 6, 18), // July 18, 2024
      time: '10:00 AM',
      category: 'courses',
      color: '#E3F2FD'
    },
    {
      id: 2,
      title: '1-on-1 with David',
      date: new Date(2024, 6, 19), // July 19, 2024
      time: '2:00 PM',
      category: 'mentorship',
      color: '#E8F5E8'
    },
    {
      id: 3,
      title: 'Weekly Check-in',
      date: new Date(2024, 6, 20), // July 20, 2024
      time: '11:00 AM',
      category: 'coaching',
      color: '#FFF8E1'
    },
    {
      id: 4,
      title: 'Milestone Review',
      date: new Date(2024, 6, 20), // July 20, 2024
      time: '3:00 PM',
      category: 'counseling',
      color: '#FFEBEE'
    }
  ];

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
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long' });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const calendarDays = getDaysInMonth(currentDate);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="lms-calendar-container">
      {/* Left Sidebar */}
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
                className={`nav-item logout-btn ${activeSection === item.id ? 'active' : ''}`}
                onClick={handleLogout}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
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

      {/* Main Content Area */}
      <div className="lms-main">
        {/* Header */}
        <div className="lms-header">
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

        {/* Calendar Content */}
        <div className="calendar-content">
          <div className="calendar-header">
            <div className="calendar-title-section">
              <h1 className="page-title">Calendar</h1>
              <p className="page-subtitle">See all your upcoming sessions, and events in one place.</p>
            </div>
            
            <div className="calendar-controls">
              <div className="month-selector">
                <button 
                  className="month-nav-btn"
                  onClick={() => handleMonthChange('prev')}
                >
                  ←
                </button>
                <span className="current-month">{getMonthName(currentDate)}</span>
                <button 
                  className="month-nav-btn"
                  onClick={() => handleMonthChange('next')}
                >
                  →
                </button>
              </div>
              
              <div className="view-toggles">
                <button 
                  className={`view-toggle ${viewMode === 'day' ? 'active' : ''}`}
                  onClick={() => handleViewModeChange('day')}
                >
                  Day
                </button>
                <button 
                  className={`view-toggle ${viewMode === 'week' ? 'active' : ''}`}
                  onClick={() => handleViewModeChange('week')}
                >
                  Week
                </button>
                <button 
                  className={`view-toggle ${viewMode === 'month' ? 'active' : ''}`}
                  onClick={() => handleViewModeChange('month')}
                >
                  Month
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="calendar-grid">
            <div className="calendar-header-row">
              {daysOfWeek.map((day) => (
                <div key={day} className="day-header">{day}</div>
              ))}
            </div>
            
            <div className="calendar-body">
              {calendarDays.map((day, index) => (
                <div 
                  key={index} 
                  className={`calendar-day ${isToday(day) ? 'today' : ''} ${!day ? 'empty' : ''}`}
                >
                  {day && (
                    <>
                      <div className="day-number">{day}</div>
                      <div className="day-events">
                        {getEventsForDate(day).map((event) => (
                          <div 
                            key={event.id} 
                            className="event-item"
                            style={{ backgroundColor: event.color }}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="calendar-right-sidebar">
        <div className="categories-section">
          <h3 className="sidebar-title">Categories</h3>
          <div className="categories-list">
            {categories.map((category) => (
              <div key={category.id} className="category-item">
                <div 
                  className="category-color" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="category-label">{category.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reminder-settings">
          <h3 className="sidebar-title">Reminder Settings</h3>
          <div className="reminder-options">
            <label className="reminder-option">
              <input 
                type="checkbox" 
                checked={emailReminder}
                onChange={(e) => setEmailReminder(e.target.checked)}
              />
              <span className="reminder-text">Email me 24 hrs before each event</span>
            </label>
            
            <label className="reminder-option">
              <input 
                type="checkbox" 
                checked={inAppReminder}
                onChange={(e) => setInAppReminder(e.target.checked)}
              />
              <span className="reminder-text">In-app reminder 15 mins before live sessions</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSCalendar;
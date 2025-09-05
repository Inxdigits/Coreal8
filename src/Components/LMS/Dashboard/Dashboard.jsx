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

  // Mock course data - matching the design exactly (2 identical cards)
  const courseData = [
    {
      id: 1,
      title: "The Visionary Leader's Blueprint",
      progress: 50,
      status: "In progress",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=120&fit=crop&crop=face",
      instructor: "Dr. Enobong",
      duration: "12 weeks"
    },
    {
      id: 2,
    title: "The Visionary Leader's Blueprint",
    progress: 50,
    status: "In progress",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=120&fit=crop&crop=face",
      instructor: "Dr. Enobong",
      duration: "12 weeks"
    }
  ];

  // Mock mentorship data - matching the design exactly (2 identical cards)
  const mentorshipData = [
    {
      id: 1,
      title: "Build personal brand & improve time discipline",
      nextSession: "Next Sessions: Jul 10, 3:00 PM",
      progress: 50,
      sessions: "Progress: 2/6 Sessions",
      status: "In progress"
    },
    {
      id: 2,
      title: "Build personal brand & improve time discipline",
      nextSession: "Next Sessions: Jul 10, 3:00 PM",
      progress: 50,
      sessions: "Progress: 2/6 Sessions",
      status: "In progress"
    }
  ];

  // Mock counseling data - matching the design exactly (2 identical cards)
  const counselingData = [
    {
      id: 1,
      nextSession: "Next Session: Jul 10, 3:00 PM",
      lastAttended: "Last Attended: Jul 1",
      progress: 50,
      sessions: "Progress: 2/6 Sessions",
      status: "In progress"
    },
    {
      id: 2,
      nextSession: "Next Session: Jul 10, 3:00 PM",
      lastAttended: "Last Attended: Jul 1",
      progress: 50,
      sessions: "Progress: 2/6 Sessions",
      status: "In progress"
    }
  ];

  // Mock coaching data - matching the design exactly (2 identical cards)
  const coachingData = [
    {
      id: 1,
      nextSession: "Next Session: Jul 10, 3:00 PM",
      lastAttended: "Last Attended: Jul 1",
      progress: 50,
      sessions: "Progress: 2/6 Sessions",
      status: "In progress"
    },
    {
      id: 2,
      nextSession: "Next Session: Jul 10, 3:00 PM",
      lastAttended: "Last Attended: Jul 1",
      progress: 50,
      sessions: "Progress: 2/6 Sessions",
      status: "In progress"
    }
  ];

  // Mock calendar data - matching the design exactly
  const calendarData = [
    {
      id: 1,
      title: "Week 01 Assignment",
      description: "Course assignment",
      time: "7:00pm"
    },
    {
      id: 2,
      title: "Week 01 Assignment",
      description: "Course assignment",
      time: "7:00pm"
    },
    {
      id: 3,
      title: "Week 01 Assignment",
      description: "Course assignment",
      time: "7:00pm"
    }
  ];

  // Mock events data - matching the design exactly
  const eventsData = [
    {
      id: 1,
      title: "Coaching Session",
      date: "July 12, 2025",
      button: "View Details >"
    },
    {
      id: 2,
      title: "Coaching Session",
      date: "July 12, 2025",
      button: "View Details >"
    },
    {
      id: 3,
      title: "Coaching Session",
      date: "July 12, 2025",
      button: "View Details >"
    }
  ];

  // Dynamic summary data based on actual content
  const summaryData = {
    courses: { count: courseData.length, label: 'On-going courses', button: 'Enrol >' },
    mentorship: { count: mentorshipData.length, label: 'On-going mentorship', button: 'Apply >' },
    counseling: { count: counselingData.length, label: 'On-going counseling', button: 'Apply >' },
    coaching: { count: coachingData.length, label: 'On-going coaching', button: 'Apply >' }
  };

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
  };

  // Filter data based on search query
  const filteredCourseData = courseData.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMentorshipData = mentorshipData.filter(mentorship => 
    mentorship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentorship.mentor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCounselingData = counselingData.filter(counseling => 
    counseling.nextSession.toLowerCase().includes(searchQuery.toLowerCase()) ||
    counseling.lastAttended.toLowerCase().includes(searchQuery.toLowerCase()) ||
    counseling.sessions.toLowerCase().includes(searchQuery.toLowerCase()) ||
    counseling.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCoachingData = coachingData.filter(coaching => 
    coaching.nextSession.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coaching.lastAttended.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coaching.sessions.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coaching.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (type) => {
    switch (type) {
      case 'courses':
        navigate('/lms/courses');
        break;
      case 'mentorship':
        navigate('/lms/mentorship');
        break;
      case 'counseling':
        navigate('/lms/counseling');
        break;
      case 'coaching':
        navigate('/lms/coaching');
        break;
      case 'calendar':
        navigate('/lms/calendar');
        break;
      case 'resources':
        navigate('/lms/resources');
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
            <div className="card-top">
              <div className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div className="card-title">Courses</div>
            </div>
            <div className="card-number">{summaryData.courses.count}</div>
            <div className="card-bottom">
              <div className="card-label">{summaryData.courses.label}</div>
              <button className="card-button">
                Enrol <span className="button-arrow">&gt;</span>
              </button>
            </div>
          </div>
          
          <div className="summary-card mentorship" onClick={() => handleCardClick('mentorship')}>
            <div className="card-top">
              <div className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="card-title">Mentorship</div>
            </div>
            <div className="card-number">{summaryData.mentorship.count}</div>
            <div className="card-bottom">
              <div className="card-label">{summaryData.mentorship.label}</div>
              <button className="card-button">
                Apply <span className="button-arrow">&gt;</span>
              </button>
            </div>
          </div>
          
          <div className="summary-card counseling" onClick={() => handleCardClick('counseling')}>
            <div className="card-top">
              <div className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="card-title">Counseling</div>
            </div>
            <div className="card-number">{summaryData.counseling.count}</div>
            <div className="card-bottom">
              <div className="card-label">{summaryData.counseling.label}</div>
              <button className="card-button">
                Apply <span className="button-arrow">&gt;</span>
              </button>
            </div>
          </div>
          
          <div className="summary-card coaching" onClick={() => handleCardClick('coaching')}>
            <div className="card-top">
              <div className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                  <circle cx="12" cy="12" r="2"/>
                  <path d="M12 1v2"/>
                  <path d="M12 17v2"/>
                  <path d="M4.22 4.22l1.42 1.42"/>
                  <path d="M18.36 18.36l1.42 1.42"/>
                  <path d="M1 12h2"/>
                  <path d="M21 12h2"/>
                  <path d="M4.22 19.78l1.42-1.42"/>
                  <path d="M18.36 5.64l1.42-1.42"/>
                </svg>
              </div>
              <div className="card-title">Coaching</div>
            </div>
            <div className="card-number">{summaryData.coaching.count}</div>
            <div className="card-bottom">
              <div className="card-label">{summaryData.coaching.label}</div>
              <button className="card-button">
                Apply <span className="button-arrow">&gt;</span>
              </button>
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
                <Link to="/lms/courses" className="view-all-link">View all</Link>
              </div>
                          <div className="courses-grid">
              {filteredCourseData.map((course) => (
                  <div key={course.id} className="course-card">
                <div className="course-thumbnail">
                      <img src={course.thumbnail} alt="Course" />
                </div>
                <div className="course-info">
                      <h4 className="course-title">{course.title}</h4>
                      <div className="course-status">{course.status}</div>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                            style={{ width: `${course.progress}%` }}
                      ></div>
                        </div>
                        <span className="progress-text">{course.progress}%</span>
                      </div>
                    </div>
                    <div className="course-arrow">→</div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Mentorship */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>My Mentorship</h3>
                <Link to="/lms/mentorship" className="view-all-link">View all</Link>
              </div>
                          <div className="mentorship-grid">
              {filteredMentorshipData.map((mentorship) => (
                  <div key={mentorship.id} className="mentorship-card">
                    <div className="mentorship-info">
                      <h4 className="mentorship-title">{mentorship.title}</h4>
                      <div className="mentorship-meta">
                        <span className="next-session">{mentorship.nextSession}</span>
                        <span className="sessions">{mentorship.sessions}</span>
                      </div>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${mentorship.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{mentorship.progress}%</span>
                      </div>
                    </div>
                    <div className="mentorship-arrow">→</div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Counseling */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>My Counseling</h3>
                <Link to="/lms/counseling" className="view-all-link">View all</Link>
              </div>
                          <div className="counseling-grid">
              {filteredCounselingData.map((counseling) => (
                  <div key={counseling.id} className="counseling-card">
                    <div className="counseling-info">
                      <div className="counseling-meta">
                        <span className="next-session">{counseling.nextSession}</span>
                        <span className="last-attended">{counseling.lastAttended}</span>
                      </div>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${counseling.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{counseling.progress}%</span>
                      </div>
                    </div>
                    <div className="counseling-arrow">→</div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Coaching */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>My Coaching</h3>
                <Link to="/lms/coaching" className="view-all-link">View all</Link>
              </div>
                          <div className="coaching-grid">
              {filteredCoachingData.map((coaching) => (
                  <div key={coaching.id} className="coaching-card">
                    <div className="coaching-info">
                      <div className="coaching-meta">
                        <span className="next-session">{coaching.nextSession}</span>
                        <span className="last-attended">{coaching.lastAttended}</span>
                      </div>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${coaching.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{coaching.progress}%</span>
                      </div>
                    </div>
                    <div className="coaching-arrow">→</div>
                  </div>
                ))}
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
              <div className="calendar-list">
                {calendarData.map((item) => (
                  <div key={item.id} className="calendar-item">
                    <div className="calendar-content">
                      <h4 className="calendar-title">{item.title}</h4>
                      <p className="calendar-description">{item.description}</p>
                    </div>
                    <div className="calendar-time">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>Events</h3>
              </div>
              <div className="events-list">
                {eventsData.map((event) => (
                  <div key={event.id} className="event-item">
                    <div className="event-content">
                      <h4 className="event-title">{event.title}</h4>
                      <p className="event-date">{event.date}</p>
                    </div>
                    <button className="event-button">{event.button}</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
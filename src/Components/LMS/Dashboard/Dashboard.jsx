import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../Firebase/Firebase.js';
import './Dashboard.css';
import logo from "../../../Assets/DashboardAssets/dashboard-logo.png";

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
            <img src={logo} alt="" />
          </div>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item) =>
            item.id === "logout" ? (
              <button
                key={item.id}
                className={`nav-item logout-btn ${
                  activeSection === item.id ? "active" : ""
                }`}
                onClick={handleLogout}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-item ${
                  activeSection === item.id ? "active" : ""
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            )
          )}
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
            <div className="notification-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="20"
                viewBox="0 0 19 20"
                fill="none"
              >
                <path
                  d="M14.1117 9.16602C14.5958 13.6452 16.5 14.9993 16.5 14.9993H1.5C1.5 14.9993 4 13.2218 4 6.99935C4 5.58518 4.52667 4.22852 5.46417 3.22852C6.40167 2.22852 7.675 1.66602 9 1.66602C9.28167 1.66602 9.55944 1.69102 9.83333 1.74102M10.4417 17.4993C10.2952 17.7519 10.0849 17.9616 9.83185 18.1073C9.57884 18.253 9.29198 18.3297 9 18.3297C8.70802 18.3297 8.42116 18.253 8.16814 18.1073C7.91513 17.9616 7.70484 17.7519 7.55833 17.4993M14.8333 6.66602C15.4964 6.66602 16.1323 6.40262 16.6011 5.93378C17.0699 5.46494 17.3333 4.82906 17.3333 4.16602C17.3333 3.50297 17.0699 2.86709 16.6011 2.39825C16.1323 1.92941 15.4964 1.66602 14.8333 1.66602C14.1703 1.66602 13.5344 1.92941 13.0656 2.39825C12.5967 2.86709 12.3333 3.50297 12.3333 4.16602C12.3333 4.82906 12.5967 5.46494 13.0656 5.93378C13.5344 6.40262 14.1703 6.66602 14.8333 6.66602Z"
                  stroke="#0D0C12"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="search-bar">
              <span className="search-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.75 0.666016C6.62049 0.666112 5.50739 0.936319 4.50355 1.45409C3.49971 1.97187 2.63424 2.7222 1.97936 3.64248C1.32448 4.56276 0.899175 5.6263 0.738924 6.74439C0.578672 7.86247 0.688124 9.00266 1.05815 10.0698C1.42817 11.137 2.04804 12.1002 2.86603 12.8791C3.68402 13.658 4.67642 14.23 5.76043 14.5473C6.84444 14.8647 7.98862 14.9182 9.09752 14.7034C10.2064 14.4887 11.2479 14.0118 12.135 13.3127L15.1783 16.356C15.3355 16.5078 15.546 16.5918 15.7645 16.5899C15.983 16.588 16.192 16.5004 16.3465 16.3459C16.501 16.1914 16.5887 15.9823 16.5906 15.7639C16.5925 15.5454 16.5085 15.3349 16.3567 15.1777L13.3133 12.1343C14.1367 11.0899 14.6493 9.83468 14.7926 8.51245C14.9359 7.19022 14.704 5.85437 14.1235 4.65776C13.543 3.46115 12.6374 2.45215 11.5103 1.74621C10.3831 1.04027 9.07997 0.665926 7.75 0.666016ZM2.33333 7.74935C2.33333 6.31276 2.90402 4.93501 3.91984 3.91919C4.93566 2.90337 6.31341 2.33268 7.75 2.33268C9.18659 2.33268 10.5643 2.90337 11.5802 3.91919C12.596 4.93501 13.1667 6.31276 13.1667 7.74935C13.1667 9.18594 12.596 10.5637 11.5802 11.5795C10.5643 12.5953 9.18659 13.166 7.75 13.166C6.31341 13.166 4.93566 12.5953 3.91984 11.5795C2.90402 10.5637 2.33333 9.18594 2.33333 7.74935Z"
                    fill="#0D0C12"
                  />
                </svg>
              </span>
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
          <div
            className="summary-card courses"
            onClick={() => handleCardClick("courses")}
          >
            <div className="card-top">
              <div className="card-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
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

          <div
            className="summary-card mentorship"
            onClick={() => handleCardClick("mentorship")}
          >
            <div className="card-top">
              <div className="card-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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

          <div
            className="summary-card counseling"
            onClick={() => handleCardClick("counseling")}
          >
            <div className="card-top">
              <div className="card-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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

          <div
            className="summary-card coaching"
            onClick={() => handleCardClick("coaching")}
          >
            <div className="card-top">
              <div className="card-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M12 1v2" />
                  <path d="M12 17v2" />
                  <path d="M4.22 4.22l1.42 1.42" />
                  <path d="M18.36 18.36l1.42 1.42" />
                  <path d="M1 12h2" />
                  <path d="M21 12h2" />
                  <path d="M4.22 19.78l1.42-1.42" />
                  <path d="M18.36 5.64l1.42-1.42" />
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
                <Link to="/lms/courses" className="view-all-link">
                  View all
                </Link>
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
                        <span className="progress-text">
                          {course.progress}%
                        </span>
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
                <Link to="/lms/mentorship" className="view-all-link">
                  View all
                </Link>
              </div>
              <div className="mentorship-grid">
                {filteredMentorshipData.map((mentorship) => (
                  <div key={mentorship.id} className="mentorship-card">
                    <div className="mentorship-info">
                      <h4 className="mentorship-title">{mentorship.title}</h4>
                      <div className="mentorship-meta">
                        <span className="next-session">
                          {mentorship.nextSession}
                        </span>
                        <span className="sessions">{mentorship.sessions}</span>
                      </div>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${mentorship.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {mentorship.progress}%
                        </span>
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
                <Link to="/lms/counseling" className="view-all-link">
                  View all
                </Link>
              </div>
              <div className="counseling-grid">
                {filteredCounselingData.map((counseling) => (
                  <div key={counseling.id} className="counseling-card">
                    <div className="counseling-info">
                      <div className="counseling-meta">
                        <span className="next-session">
                          {counseling.nextSession}
                        </span>
                        <span className="last-attended">
                          {counseling.lastAttended}
                        </span>
                      </div>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${counseling.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {counseling.progress}%
                        </span>
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
                <Link to="/lms/coaching" className="view-all-link">
                  View all
                </Link>
              </div>
              <div className="coaching-grid">
                {filteredCoachingData.map((coaching) => (
                  <div key={coaching.id} className="coaching-card">
                    <div className="coaching-info">
                      <div className="coaching-meta">
                        <span className="next-session">
                          {coaching.nextSession}
                        </span>
                        <span className="last-attended">
                          {coaching.lastAttended}
                        </span>
                      </div>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${coaching.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {coaching.progress}%
                        </span>
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
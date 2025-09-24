import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../Firebase/Firebase.js';
import DashboardSidebar from '../Dashboard/Components/DashboardSidebar.jsx';
import '../Dashboard/Dashboard.css';
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
          profileImage: user.photoURL ? `${user.photoURL}?sz=40` : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        });
      } else {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);


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
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="welcome-text">Welcome Back, {user?.name || 'User'}</h1>
            <p className="page-subtitle">Calendar - See all your upcoming sessions, and events in one place.</p>
          </div>
          <div className="header-right">
            <div className="header-actions">
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="Q Search" 
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="notification-bell">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5S10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="#6B7280"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          <div className="calendar-container">
            {/* Calendar Section */}
            <div className="calendar-main">
              {/* Calendar Header */}
              <div className="calendar-header">
                <div className="month-selector">
                  <select className="month-dropdown">
                    <option value="july">July</option>
                    <option value="august">August</option>
                    <option value="september">September</option>
                    <option value="october">October</option>
                    <option value="november">November</option>
                    <option value="december">December</option>
                  </select>
                </div>
                <div className="view-tabs">
                  <button className="tab active">Day</button>
                  <button className="tab">Week</button>
                  <button className="tab">Month</button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="calendar-grid">
                <div className="calendar-header-row">
                  <div className="day-header">MON</div>
                  <div className="day-header">TUE</div>
                  <div className="day-header">WED</div>
                  <div className="day-header">THU</div>
                  <div className="day-header">FRI</div>
                  <div className="day-header">SAT</div>
                  <div className="day-header">SUN</div>
                </div>
                
                <div className="calendar-body">
                  {/* Week 1 */}
                  <div className="calendar-week">
                    <div className="calendar-day">
                      <div className="day-number">18</div>
                      <div className="event-block mentorship-event">
                        <div className="event-title">Module 3 Live Session</div>
                        <div className="event-date">July 18</div>
                      </div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">19</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">20</div>
                      <div className="event-block coaching-event">
                        <div className="event-title">1-on-1 with David</div>
                        <div className="event-date">July 19</div>
                      </div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">21</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">22</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">23</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">24</div>
                    </div>
                  </div>

                  {/* Week 2 */}
                  <div className="calendar-week">
                    <div className="calendar-day">
                      <div className="day-number">25</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">26</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">27</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">28</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">29</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">30</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">31</div>
                    </div>
                  </div>

                  {/* Week 3 */}
                  <div className="calendar-week">
                    <div className="calendar-day">
                      <div className="day-number">1</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">2</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">3</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">4</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">5</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">6</div>
                    </div>
                    <div className="calendar-day">
                      <div className="day-number">7</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="calendar-sidebar">
              {/* Categories Section */}
              <div className="categories-section">
                <h3 className="sidebar-title">Categories</h3>
                <div className="category-list">
                  <div className="category-item">
                    <div className="category-color mentorship-color"></div>
                    <span className="category-label">Mentorship</span>
                  </div>
                  <div className="category-item">
                    <div className="category-color counseling-color"></div>
                    <span className="category-label">Counseling</span>
                  </div>
                  <div className="category-item">
                    <div className="category-color coaching-color"></div>
                    <span className="category-label">Coaching</span>
                  </div>
                  <div className="category-item">
                    <div className="category-color mentorship-dark-color"></div>
                    <span className="category-label">Mentorship</span>
                  </div>
                </div>
              </div>

              {/* Reminder Settings Section */}
              <div className="reminder-settings-section">
                <h3 className="sidebar-title">Reminder Settings</h3>
                <div className="reminder-options">
                  <label className="reminder-option">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <span className="reminder-text">Email me 24 hrs before each event</span>
                  </label>
                  <label className="reminder-option">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <span className="reminder-text">In-app reminder 15 mins before live sessions</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSCalendar;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../Firebase/Firebase.js';
import DashboardSidebar from '../Dashboard/Components/DashboardSidebar';
import '../Dashboard/Dashboard.css';
import './LMSMyMentorship.css';

const LMSMyMentorship = () => {
  const [activeSection, setActiveSection] = useState('mentorship');
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
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
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const mentorships = [
    {
      id: 1,
      title: "Executive Leadership Mentorship",
      description: "One-on-one mentorship with Dr. Enobong to develop executive leadership skills and strategic thinking.",
      status: "Active",
      mentor: "Dr. Enobong",
      mentorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      duration: "6 months",
      sessions: 12,
      completedSessions: 8,
      nextSession: "2024-01-15",
      category: "Leadership",
      price: "$2,999",
      rating: 4.9,
      progress: 67
    },
    {
      id: 2,
      title: "Business Strategy Mentorship",
      description: "Strategic business mentorship focusing on scaling and growth strategies for entrepreneurs.",
      status: "Pending",
      mentor: "Dr. Enobong",
      mentorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      duration: "4 months",
      sessions: 8,
      completedSessions: 0,
      nextSession: "2024-01-20",
      category: "Business",
      price: "$1,999",
      rating: 4.8,
      progress: 0
    },
    {
      id: 3,
      title: "Personal Development Mentorship",
      description: "Comprehensive personal development mentorship to unlock your full potential.",
      status: "Completed",
      mentor: "Dr. Enobong",
      mentorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      duration: "3 months",
      sessions: 6,
      completedSessions: 6,
      nextSession: null,
      category: "Personal Development",
      price: "$1,499",
      rating: 4.9,
      progress: 100
    }
  ];


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  const filteredMentorships = mentorships.filter(mentorship => {
    const matchesSearch = mentorship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentorship.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && mentorship.status === 'Active') ||
                         (filter === 'pending' && mentorship.status === 'Pending') ||
                         (filter === 'completed' && mentorship.status === 'Completed');
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#10b981';
      case 'Pending': return '#f59e0b';
      case 'Completed': return '#6b7280';
      default: return '#6b7280';
    }
  };

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
            <p className="page-subtitle">Connect with mentors and accelerate your growth journey</p>
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

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilter('all')}
          >
            All Mentorships
          </button>
          <button 
            className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => handleFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => handleFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => handleFilter('completed')}
          >
            Completed
          </button>
        </div>

        {/* Mentorships Grid */}
        <div className="mentorships-grid">
          {filteredMentorships.map((mentorship) => (
            <div key={mentorship.id} className="mentorship-card">
              <div className="mentorship-header">
                <div className="mentor-info">
                  <div className="mentor-avatar">
                    <img src={mentorship.mentorImage} alt={mentorship.mentor} />
                  </div>
                  <div className="mentor-details">
                    <h3 className="mentor-name">{mentorship.mentor}</h3>
                    <div className="mentor-rating">
                      <span className="stars">★★★★★</span>
                      <span className="rating-number">{mentorship.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="mentorship-status" style={{ color: getStatusColor(mentorship.status) }}>
                  {mentorship.status}
                </div>
              </div>
              
              <div className="mentorship-content">
                <h4 className="mentorship-title">{mentorship.title}</h4>
                <p className="mentorship-description">{mentorship.description}</p>
                
                <div className="mentorship-meta">
                  <div className="meta-item">
                    <span className="meta-label">Duration:</span>
                    <span className="meta-value">{mentorship.duration}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Sessions:</span>
                    <span className="meta-value">{mentorship.completedSessions}/{mentorship.sessions}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Category:</span>
                    <span className="meta-value">{mentorship.category}</span>
                  </div>
                  {mentorship.nextSession && (
                    <div className="meta-item">
                      <span className="meta-label">Next Session:</span>
                      <span className="meta-value">{new Date(mentorship.nextSession).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {mentorship.progress > 0 && (
                  <div className="progress-section">
                    <div className="progress-header">
                      <span className="progress-label">Progress</span>
                      <span className="progress-percentage">{mentorship.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${mentorship.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="mentorship-footer">
                  <div className="mentorship-price">{mentorship.price}</div>
                  <div className="mentorship-actions">
                    {mentorship.status === 'Active' && (
                      <button className="join-session-btn">Join Next Session</button>
                    )}
                    {mentorship.status === 'Pending' && (
                      <button className="view-details-btn">View Details</button>
                    )}
                    {mentorship.status === 'Completed' && (
                      <button className="view-certificate-btn">View Certificate</button>
                    )}
                    <button className="message-mentor-btn">Message Mentor</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMentorships.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3 className="empty-title">No mentorships found</h3>
            <p className="empty-description">
              {searchQuery ? 'Try adjusting your search terms' : 'No mentorships match your current filter'}
            </p>
            <button className="find-mentor-btn">Find a Mentor</button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default LMSMyMentorship;

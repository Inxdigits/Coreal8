import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../Firebase/Firebase.js';
import DashboardSidebar from '../Dashboard/Components/DashboardSidebar';
import '../Dashboard/Dashboard.css';
import './LMSCourses.css';

const LMSMyCourses = () => {
  const [activeSection, setActiveSection] = useState('courses');
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

  const courses = [
    {
      id: 1,
      title: "The Visionary Leader's Blueprint",
      description: "Master the art of visionary leadership and transform your organization with strategic thinking and innovative approaches.",
      progress: 75,
      status: "In progress",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=face",
      instructor: "Dr. Enobong",
      duration: "12 weeks",
      level: "Intermediate",
      category: "Leadership",
      price: "$299",
      rating: 4.8,
      students: 1247
    },
    {
      id: 2,
      title: "Strategic Business Management",
      description: "Learn advanced business management strategies to scale your company and achieve sustainable growth.",
      progress: 45,
      status: "In progress",
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop&crop=face",
      instructor: "Dr. Enobong",
      duration: "8 weeks",
      level: "Advanced",
      category: "Business",
      price: "$399",
      rating: 4.9,
      students: 892
    },
    {
      id: 3,
      title: "Personal Development Mastery",
      description: "Unlock your full potential with comprehensive personal development strategies and mindset transformation.",
      progress: 90,
      status: "Almost complete",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop&crop=face",
      instructor: "Dr. Enobong",
      duration: "6 weeks",
      level: "Beginner",
      category: "Personal Development",
      price: "$199",
      rating: 4.7,
      students: 2156
    },
    {
      id: 4,
      title: "Digital Marketing Excellence",
      description: "Master digital marketing strategies to grow your business online and reach your target audience effectively.",
      progress: 0,
      status: "Not started",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&crop=face",
      instructor: "Dr. Enobong",
      duration: "10 weeks",
      level: "Intermediate",
      category: "Marketing",
      price: "$349",
      rating: 4.6,
      students: 1834
    },
    {
      id: 5,
      title: "Financial Planning & Investment",
      description: "Learn professional financial planning and investment strategies to secure your financial future.",
      progress: 0,
      status: "Not started",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop&crop=face",
      instructor: "Dr. Enobong",
      duration: "14 weeks",
      level: "Advanced",
      category: "Finance",
      price: "$449",
      rating: 4.9,
      students: 756
    },
    {
      id: 6,
      title: "Communication & Public Speaking",
      description: "Develop powerful communication skills and master the art of public speaking to influence and inspire.",
      progress: 0,
      status: "Not started",
      thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop&crop=face",
      instructor: "Dr. Enobong",
      duration: "6 weeks",
      level: "Beginner",
      category: "Communication",
      price: "$179",
      rating: 4.8,
      students: 3245
    }
  ];


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'in-progress' && course.progress > 0 && course.progress < 100) ||
                         (filter === 'completed' && course.progress === 100) ||
                         (filter === 'not-started' && course.progress === 0);
    return matchesSearch && matchesFilter;
  });

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
            <p className="page-subtitle">Continue your learning journey and explore new courses</p>
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
            All Courses
          </button>
          <button 
            className={`filter-tab ${filter === 'in-progress' ? 'active' : ''}`}
            onClick={() => handleFilter('in-progress')}
          >
            In Progress
          </button>
          <button 
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => handleFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={`filter-tab ${filter === 'not-started' ? 'active' : ''}`}
            onClick={() => handleFilter('not-started')}
          >
            Not Started
          </button>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-thumbnail">
                <img src={course.thumbnail} alt={course.title} />
                <div className="course-level">{course.level}</div>
                <div className="course-category">{course.category}</div>
              </div>
              <div className="course-content">
                <div className="course-header">
                  <h3 className="course-title">{course.title}</h3>
                  <div className="course-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-number">{course.rating}</span>
                  </div>
                </div>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <div className="course-instructor">
                    <span className="meta-label">Instructor:</span>
                    <span className="meta-value">{course.instructor}</span>
                  </div>
                  <div className="course-duration">
                    <span className="meta-label">Duration:</span>
                    <span className="meta-value">{course.duration}</span>
                  </div>
                  <div className="course-students">
                    <span className="meta-label">Students:</span>
                    <span className="meta-value">{course.students.toLocaleString()}</span>
                  </div>
                </div>
                {course.progress > 0 && (
                  <div className="progress-section">
                    <div className="progress-header">
                      <span className="progress-label">Progress</span>
                      <span className="progress-percentage">{course.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <div className="course-footer">
                  <div className="course-price">{course.price}</div>
                  <div className="course-actions">
                    {course.progress > 0 ? (
                      <button className="continue-btn">Continue Learning</button>
                    ) : (
                      <button className="start-btn">Start Course</button>
                    )}
                    <button className="view-btn">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3 className="empty-title">No courses found</h3>
            <p className="empty-description">
              {searchQuery ? 'Try adjusting your search terms' : 'No courses match your current filter'}
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default LMSMyCourses;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext.jsx';
import { useCourseContext } from '../../../context/CourseContext.jsx';
import DashboardSidebar from './Components/DashboardSidebar';
import './Dashboard.css';
import courseIcon from '../../../Assets/LmsPageAssets/icon-courses.svg';
import mentorshipIcon from '../../../Assets/LmsPageAssets/icon-mentorship.svg';
import counselingIcon from '../../../Assets/LmsPageAssets/icon-counseling.svg';
import coachingIcon from '../../../Assets/LmsPageAssets/icon-coaching.svg';
import arrowIcon from '../../../Assets/LmsPageAssets/arrow.svg';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const { enrolledCourses, completedCourses, getCourseProgress } = useCourseContext();

  // Get course data for enrolled courses (same as in CourseManagement)
  const getCourseData = (courseId) => {
    const coursesData = {
      1: {
        id: 1,
        title: "The Visionary Leader's Blueprint",
        thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=120&fit=crop&crop=faces"
      },
      2: {
        id: 2,
        title: "Strategic Management Fundamentals",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=120&fit=crop&crop=faces"
      },
      3: {
        id: 3,
        title: "Digital Transformation Leadership",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=120&fit=crop&crop=faces"
      }
    };
    return coursesData[courseId];
  };

  // Get the first enrolled course for display
  const firstEnrolledCourse = enrolledCourses.length > 0 ? enrolledCourses[0] : null;
  const firstCourseData = firstEnrolledCourse ? getCourseData(firstEnrolledCourse.id) : null;
  const firstCourseProgress = firstEnrolledCourse ? getCourseProgress(firstEnrolledCourse.id) : 0;

  const handleViewCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="welcome-text">Welcome Back, {user?.name || 'User'}</h1>
          </div>
          <div className="header-right">
            <div className="header-actions">
              <div className="search-container">
                <input type="text" placeholder="Q Search" className="search-input" />
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
          {/* Service Cards */}
          <div className="service-cards">
            {/* Courses Card */}
            <div className="service-card">
              <div className="service-title-row">
                <div className="service-icon"><img src={courseIcon} alt="course" /></div>
                <h3 className="service-title">Courses</h3>
              </div>
              <div className="service-content">
                <div className="service-count">{enrolledCourses.length}</div>
                <div className="service-subtitle-row">
                  <p className="service-subtitle">On-going courses</p>
                  <button className="service-button" onClick={() => navigate('/my-courses')}>
                    Enrol <img src={arrowIcon} alt="arrow" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mentorship Card */}
            <div className="service-card">
              <div className="service-title-row">
                <div className="service-icon"><img src={mentorshipIcon} alt="mentorship" /></div>
                <h3 className="service-title">Mentorship</h3>
              </div>
              <div className="service-content">
                <div className="service-count">0</div>
                <div className="service-subtitle-row">
                  <p className="service-subtitle">On-going mentorship</p>
                  <button className="service-button">
                    Apply <img src={arrowIcon} alt="arrow" />
                  </button>
                </div>
              </div>
            </div>

            {/* Counseling Card */}
            <div className="service-card">
              <div className="service-title-row">
                <div className="service-icon"><img src={counselingIcon} alt="counseling" /></div>
                <h3 className="service-title">Counseling</h3>
              </div>
              <div className="service-content">
                <div className="service-count">0</div>
                <div className="service-subtitle-row">
                  <p className="service-subtitle">On-going counseling</p>
                  <button className="service-button">
                    Apply <img src={arrowIcon} alt="arrow" />
                  </button>
                </div>
              </div>
            </div>

            {/* Coaching Card */}
            <div className="service-card">
              <div className="service-title-row">
                <div className="service-icon"><img src={coachingIcon} alt="coaching" /></div>
                <h3 className="service-title">Coaching</h3>
              </div>
              <div className="service-content">
                <div className="service-count">0</div>
                <div className="service-subtitle-row">
                  <p className="service-subtitle">On-going coaching</p>
                  <button className="service-button">
                    Apply <img src={arrowIcon} alt="arrow" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Sections */}
          <div className="main-sections">
            {/* Left Column */}
            <div className="left-column">
              {/* My Courses Section */}
              <div className="section-card">
                <div className="section-header">
                  <h2 className="section-title">My Courses</h2>
                  <a href="/my-courses" className="view-all-link">View all</a>
                </div>
                {enrolledCourses.length > 0 ? (
                  <div className="courses-list">
                    {enrolledCourses.map((course) => {
                      const courseData = getCourseData(course.id);
                      const courseProgress = getCourseProgress(course.id);
                      return (
                        <div key={course.id} className="course-card" onClick={() => handleViewCourse(course.id)}>
                          <div className="course-thumbnail">
                            <img src={courseData?.thumbnail || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop"} alt={courseData?.title || course.title} />
                          </div>
                          <div className="course-info">
                            <h3 className="course-title">{courseData?.title || course.title}</h3>
                            <div className="course-status">In progress</div>
                            <div className="progress-container">
                              <div className="progress-bar">
                                <div className="progress-fill" style={{width: `${courseProgress}%`}}></div>
                              </div>
                              <span className="progress-text">{courseProgress}%</span>
                            </div>
                          </div>
                          <div className="course-arrow">
                            <img src={arrowIcon} alt="arrow" />
                          </div>
                        </div>
                      );
                    })}
                    {enrolledCourses.length > 3 && (
                      <div className="more-courses-indicator">
                        <p className="more-courses-text">
                          +{enrolledCourses.length - 3} more courses
                        </p>
                        <p className="more-courses-subtext">Click "View all" to see all courses</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p className="empty-text">No Active Courses</p>
                    <p className="empty-subtext">You're not enrolled in any courses yet.</p>
                    <button className="action-button" onClick={() => navigate('/my-courses')}>Browse Courses</button>
                  </div>
                )}
              </div>

              {/* My Counseling Section */}
              <div className="section-card">
                <div className="section-header">
                  <h2 className="section-title">My Counseling</h2>
                  <a href="/lms/counseling" className="view-all-link">View all</a>
                </div>
                <div className="empty-state">
                  <p className="empty-text">No Active Counseling Sessions</p>
                  <p className="empty-subtext">You're not enrolled in a counseling program yet.</p>
                  <button className="action-button">Start Counseling</button>
                </div>
              </div>

              {/* My Mentorship Section */}
              <div className="section-card">
                <div className="section-header">
                  <h2 className="section-title">My Mentorship</h2>
                  <a href="/lms/mentorship" className="view-all-link">View all</a>
                </div>
                <div className="empty-state">
                  <p className="empty-text">No Active Mentorship Sessions</p>
                  <p className="empty-subtext">You're not enrolled in a mentorship program yet.</p>
                  <button className="action-button">Explore Mentorships</button>
                </div>
              </div>

              {/* My Coaching Section */}
              <div className="section-card">
                <div className="section-header">
                  <h2 className="section-title">My Coaching</h2>
                  <a href="/lms/coaching" className="view-all-link">View all</a>
                </div>
                <div className="empty-state">
                  <p className="empty-text">No Active Coaching Sessions</p>
                  <p className="empty-subtext">You're not enrolled in a coaching program yet.</p>
                  <button className="action-button">Book Coaching</button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="right-column">
              {/* My Calendar Section */}
              <div className="section-card" id='calendar-section'>
                <div className="section-header" id='calendar'>
                  <h2 className="section-title">My Calendar</h2>
                </div>
                <div className="empty-state calendar-empty">
                  <p className="empty-text">Nothing in Calendar</p>
                  <p className="empty-subtext">You have nothing in your calendar.</p>
                </div>
              </div>

              {/* Events Section */}
              <div className="section-card">
                <div className="section-header">
                  <h2 className="section-title">Events</h2>
                </div>
                <div className="empty-state event-empty">
                  <p className="empty-text">No Upcoming Event</p>
                  <p className="empty-subtext">You have upcoming event.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

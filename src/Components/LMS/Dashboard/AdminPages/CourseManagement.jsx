import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../Firebase/Firebase.js';
import { useCourseContext } from '../../../../context/CourseContext.jsx';
import DashboardSidebar from '../Components/DashboardSidebar';
import UnenrollModal from '../../Modals/UnenrollModal';
import UnenrollSuccessModal from '../../Modals/UnenrollSuccessModal';
import '../Dashboard.css';
import './MyCourses.css';

const CourseManagement = () => {
  const navigate = useNavigate();
  const { enrolledCourses, completedCourses, unenrollCourse } = useCourseContext();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('enrolled');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Leadership & Influence');
  const [showUnenrollModal, setShowUnenrollModal] = useState(false);
  const [showUnenrollSuccessModal, setShowUnenrollSuccessModal] = useState(false);
  const [courseToUnenroll, setCourseToUnenroll] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          name: user.displayName || 'User',
          email: user.email || 'user@example.com',
          profileImage: user.photoURL ? `${user.photoURL}?sz=40` : 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Get course data for enrolled courses
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

  const featuredCourses = [
    {
      id: 1,
      title: "The Visionary Leader's Blueprint",
      description: "Learn how to lead with clarity, courage, and conviction in today's dynamic world.",
      price: "N45,000",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=180&fit=crop&crop=faces"
    },
    {
      id: 2,
      title: "Strategic Management Fundamentals",
      description: "Master the art of strategic thinking and organizational leadership.",
      price: "N35,000",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=180&fit=crop&crop=faces"
    },
    {
      id: 3,
      title: "Digital Transformation Leadership",
      description: "Lead your organization through digital change and innovation.",
      price: "N50,000",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=180&fit=crop&crop=faces"
    },
    {
      id: 4,
      title: "Team Building & Collaboration",
      description: "Build high-performing teams and foster collaborative environments.",
      price: "N30,000",
      thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=180&fit=crop&crop=faces"
    },
    {
      id: 5,
      title: "Communication Excellence",
      description: "Develop powerful communication skills for leadership success.",
      price: "N25,000",
      thumbnail: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=300&h=180&fit=crop&crop=faces"
    },
    {
      id: 6,
      title: "Innovation & Change Management",
      description: "Drive innovation and manage organizational change effectively.",
      price: "N40,000",
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=180&fit=crop&crop=faces"
    }
  ];

  const handleViewCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleUnenrollCourse = (courseId) => {
    const course = enrolledCourses.find(c => c.id === courseId);
    setCourseToUnenroll(course);
    setShowUnenrollModal(true);
  };

  const handleConfirmUnenroll = () => {
    if (courseToUnenroll) {
      const result = unenrollCourse(courseToUnenroll.id);
      if (result.success) {
        setShowUnenrollModal(false);
        setShowUnenrollSuccessModal(true);
      } else {
        alert(result.message);
      }
    }
  };

  const handleCloseUnenrollModal = () => {
    setShowUnenrollModal(false);
    setCourseToUnenroll(null);
  };

  const handleCloseUnenrollSuccessModal = () => {
    setShowUnenrollSuccessModal(false);
    setCourseToUnenroll(null);
  };

  // Search functionality
  const searchCourses = (query) => {
    if (!query.trim()) return [];
    
    const allCourses = [
      ...enrolledCourses.map(course => ({ ...course, type: 'enrolled' })),
      ...completedCourses.map(course => ({ ...course, type: 'completed' })),
      ...featuredCourses.map(course => ({ ...course, type: 'featured' }))
    ];

    return allCourses.filter(course => {
      const courseData = getCourseData(course.id);
      const searchTerm = query.toLowerCase();
      
      return (
        course.title.toLowerCase().includes(searchTerm) ||
        (courseData?.title && courseData.title.toLowerCase().includes(searchTerm)) ||
        (course.description && course.description.toLowerCase().includes(searchTerm)) ||
        (courseData?.description && courseData.description.toLowerCase().includes(searchTerm)) ||
        (course.category && course.category.toLowerCase().includes(searchTerm))
      );
    });
  };

  const filteredEnrolledCourses = searchQuery 
    ? searchCourses(searchQuery).filter(course => course.type === 'enrolled')
    : enrolledCourses;

  const filteredCompletedCourses = searchQuery 
    ? searchCourses(searchQuery).filter(course => course.type === 'completed')
    : completedCourses;

  const filteredFeaturedCourses = searchQuery 
    ? searchCourses(searchQuery).filter(course => course.type === 'featured')
    : featuredCourses;

  const hasSearchResults = searchQuery && (
    filteredEnrolledCourses.length > 0 || 
    filteredCompletedCourses.length > 0 || 
    filteredFeaturedCourses.length > 0
  );

  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-main">
        {/* Main Content */}
        <div className="dashboard-content my-courses-full-height">
          <div className="my-courses-container">
            {/* My Courses Section */}
            <div className="my-courses-section">
              <div className="section-header">
                <h2 className="section-title">My Courses</h2>
                <div className="header-controls">
                  <div className="search-container">
                    <input 
                      type="text" 
                      placeholder="Search" 
                      className="search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="filter-container">
                    <span className="filter-label">Filter by:</span>
                    <select 
                      className="filter-dropdown"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      <option value="Leadership & Influence">Leadership & Influence</option>
                      <option value="Management">Management</option>
                      <option value="Communication">Communication</option>
                      <option value="Strategy">Strategy</option>
                    </select>
          </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="course-tabs">
                <button 
                  className={`tab ${activeTab === 'enrolled' ? 'active' : ''}`}
                  onClick={() => setActiveTab('enrolled')}
                >
                  Enrolled Courses
                </button>
                <button 
                  className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
                  onClick={() => setActiveTab('completed')}
                >
                  Completed Courses
                </button>
              </div>

              {/* Search Results Summary */}
              {searchQuery && (
                <div className="search-results-summary">
                  <p className="search-results-text">
                    {hasSearchResults 
                      ? `Found ${filteredEnrolledCourses.length + filteredCompletedCourses.length + filteredFeaturedCourses.length} course(s) for "${searchQuery}"`
                      : `No courses found for "${searchQuery}"`
                    }
                  </p>
                  {!hasSearchResults && (
                    <button 
                      className="clear-search-btn"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )}

              {/* Enrolled Courses */}
              {activeTab === 'enrolled' && (
                <div className="enrolled-courses">
                  {filteredEnrolledCourses.length === 0 ? (
                    <div className="empty-state">
                      <p className="empty-text">
                        {searchQuery ? 'No matching enrolled courses' : 'No Enrolled Courses'}
                      </p>
                      <p className="empty-subtext">
                        {searchQuery ? 'Try a different search term' : "You haven't enrolled in any courses yet."}
                      </p>
                    </div>
                  ) : (
                    filteredEnrolledCourses.map((course) => {
                      const courseData = getCourseData(course.id);
                      return (
                        <div key={course.id} className="enrolled-course-card">
                          <div className="course-thumbnail">
                            <img src={courseData?.thumbnail || course.thumbnail} alt={course.title} />
                          </div>
                          <div className="course-info">
                            <h3 className="course-title">{course.title}</h3>
                            <div className="progress-container">
                              <div className="progress-bar">
                                <div 
                                  className="progress-fill" 
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="course-status-container">
                              <p className="course-status">In progress</p>
                              <span className="progress-text">{course.progress}%</span>
                            </div>
                          </div>
                          <div className="course-actions">
                            <button 
                              className="continue-btn"
                              onClick={() => navigate(`/lms/course/${course.id}`)}
                            >
                              Continue Course
                            </button>
                            <button 
                              className="unenroll-btn"
                              onClick={() => handleUnenrollCourse(course.id)}
                            >
                              Unenroll
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                  
                  {/* Navigation Arrows */}
                  <div className="course-navigation">
                    <button className="nav-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="nav-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Completed Courses */}
              {activeTab === 'completed' && (
                <div className="completed-courses">
                  {filteredCompletedCourses.length === 0 ? (
                    <div className="empty-state">
                      <p className="empty-text">
                        {searchQuery ? 'No matching completed courses' : 'No Completed Courses'}
                      </p>
                      <p className="empty-subtext">
                        {searchQuery ? 'Try a different search term' : "You haven't completed any courses yet."}
                      </p>
                    </div>
                  ) : (
                    filteredCompletedCourses.map((course) => {
                      const courseData = getCourseData(course.id);
                      return (
                        <div key={course.id} className="enrolled-course-card">
                          <div className="course-thumbnail">
                            <img src={courseData?.thumbnail || course.thumbnail} alt={course.title} />
                          </div>
                          <div className="course-info">
                            <h3 className="course-title">{course.title}</h3>
                            <div className="progress-container">
                              <div className="progress-bar">
                                <div 
                                  className="progress-fill" 
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="course-status-container">
                              <p className="course-status">Completed</p>
                              <span className="progress-text">{course.progress}%</span>
                            </div>
                          </div>
                          <div className="course-actions">
                            <button 
                              className="continue-btn"
                              onClick={() => navigate(`/course/${course.id}`)}
                            >
                              View Certificate
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Featured Courses Section */}
            <div className="featured-courses-section">
              <h2 className="section-title">
                {searchQuery ? `Featured Courses (${filteredFeaturedCourses.length})` : 'Featured Courses'}
              </h2>
              <div className="featured-courses-grid">
                {filteredFeaturedCourses.length === 0 && searchQuery ? (
                  <div className="empty-state">
                    <p className="empty-text">No matching featured courses</p>
                    <p className="empty-subtext">Try a different search term</p>
                  </div>
                ) : (
                  filteredFeaturedCourses.map((course) => (
                  <div key={course.id} className="featured-course-card">
                    <div className="course-thumbnail">
                      <img src={course.thumbnail} alt={course.title} />
                    </div>
                    <div className="course-content">
                      <h3 className="course-title">{course.title}</h3>
                      <p className="course-description">{course.description}</p>
                      <div className="course-footer">
                        <span className="course-price">{course.price}</span>
                        <button 
                          onClick={() => handleViewCourse(course.id)} 
                          className="view-course-link"
                        >
                          View Course
                          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.39584 3.875C4.94829 3.875 4.51907 4.05279 4.2026 4.36926C3.88613 4.68572 3.70834 5.11495 3.70834 5.5625V13.4375C3.70834 13.8851 3.88613 14.3143 4.2026 14.6307C4.51907 14.9472 4.94829 15.125 5.39584 15.125H13.2708C13.7184 15.125 14.1476 14.9472 14.4641 14.6307C14.7806 14.3143 14.9583 13.8851 14.9583 13.4375V10.9288C14.9583 10.7796 15.0176 10.6365 15.1231 10.531C15.2286 10.4255 15.3717 10.3663 15.5208 10.3663C15.67 10.3663 15.8131 10.4255 15.9186 10.531C16.0241 10.6365 16.0833 10.7796 16.0833 10.9288V13.4375C16.0833 14.1834 15.787 14.8988 15.2596 15.4262C14.7321 15.9537 14.0168 16.25 13.2708 16.25H5.39584C4.64992 16.25 3.93455 15.9537 3.40711 15.4262C2.87966 14.8988 2.58334 14.1834 2.58334 13.4375V5.5625C2.58334 4.81658 2.87966 4.10121 3.40711 3.57376C3.93455 3.04632 4.64992 2.75 5.39584 2.75H7.90459C8.05378 2.75 8.19685 2.80926 8.30234 2.91475C8.40783 3.02024 8.46709 3.16332 8.46709 3.3125C8.46709 3.46168 8.40783 3.60476 8.30234 3.71025C8.19685 3.81574 8.05378 3.875 7.90459 3.875H5.39584ZM10.1996 3.3125C10.1996 3.16332 10.2589 3.02024 10.3643 2.91475C10.4698 2.80926 10.6129 2.75 10.7621 2.75H15.5208C15.67 2.75 15.8131 2.80926 15.9186 2.91475C16.0241 3.02024 16.0833 3.16332 16.0833 3.3125V8.07125C16.0833 8.22043 16.0241 8.36351 15.9186 8.469C15.8131 8.57449 15.67 8.63375 15.5208 8.63375C15.3717 8.63375 15.2286 8.57449 15.1231 8.469C15.0176 8.36351 14.9583 8.22043 14.9583 8.07125V4.6715L11.1592 8.4695C11.1073 8.52322 11.0453 8.56608 10.9766 8.59556C10.908 8.62504 10.8342 8.64055 10.7595 8.6412C10.6848 8.64185 10.6107 8.62762 10.5416 8.59934C10.4725 8.57105 10.4097 8.52929 10.3569 8.47647C10.3041 8.42366 10.2623 8.36085 10.234 8.29172C10.2057 8.2226 10.1915 8.14853 10.1921 8.07384C10.1928 7.99915 10.2083 7.92534 10.2378 7.85671C10.2673 7.78808 10.3101 7.72601 10.3638 7.67412L14.163 3.875H10.761C10.6118 3.875 10.4687 3.81574 10.3632 3.71025C10.2577 3.60476 10.1985 3.46168 10.1985 3.3125" fill="#801323"/>
</svg>
                          
                        </button>
                      </div>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unenroll Modal */}
      <UnenrollModal
        isOpen={showUnenrollModal}
        onClose={handleCloseUnenrollModal}
        courseTitle={courseToUnenroll?.title}
        onConfirmUnenroll={handleConfirmUnenroll}
      />

      {/* Unenroll Success Modal */}
      <UnenrollSuccessModal
        isOpen={showUnenrollSuccessModal}
        onClose={handleCloseUnenrollSuccessModal}
        courseTitle={courseToUnenroll?.title}
      />
    </div>
  );
};

export default CourseManagement;

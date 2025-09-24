import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../../../../Firebase/Firebase.js';
import { useCourseContext } from '../../../../context/CourseContext.jsx';
import DashboardSidebar from '../Components/DashboardSidebar';
import EnrollmentModal from '../../Modals/EnrollmentModal';
import UnenrollModal from '../../Modals/UnenrollModal';
import UnenrollSuccessModal from '../../Modals/UnenrollSuccessModal';
import CourseCompletionModal from '../../Modals/CourseCompletionModal';
import '../Dashboard.css';
import './CourseView.css';

const CourseView = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { 
    enrolledCourses,
    enrollCourse, 
    unenrollCourse,
    markModuleComplete, 
    unmarkModuleComplete, 
    isModuleCompleted, 
    isCourseEnrolled,
    getCourseProgress 
  } = useCourseContext();
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('modules');
  const [selectedModule, setSelectedModule] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [showUnenrollModal, setShowUnenrollModal] = useState(false);
  const [showUnenrollSuccessModal, setShowUnenrollSuccessModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

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

  useEffect(() => {
    // Mock course data - in a real app, this would fetch from an API based on courseId
    const coursesData = {
      1: {
        id: 1,
        title: "The Visionary Leader's Blueprint",
        progress: 30,
        certificate: "Not Available",
        thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=180&fit=crop&crop=faces",
        modules: [
          {
            id: 1,
            title: "Introduction",
            content: "Welcome to The Visionary Leader's Blueprint. This comprehensive course will transform your leadership approach and help you develop the skills needed to lead with clarity, courage, and conviction in today's dynamic world. You'll learn how to create compelling visions, inspire teams, and drive meaningful change in your organization.",
            videoUrl: "https://example.com/video1",
            isCompleted: false
          },
          {
            id: 2,
            title: "Understanding The Vision",
            content: "In this module, we'll explore the fundamental principles of visionary leadership. You'll discover how to craft a compelling vision that resonates with your team and stakeholders. We'll cover the psychology of vision creation and the practical steps to communicate your vision effectively.",
            videoUrl: "https://example.com/video2",
            isCompleted: false
          },
          {
            id: 3,
            title: "Strategic Planning and Execution",
            content: "Learn how to translate your vision into actionable strategies. This module covers strategic planning frameworks, resource allocation, timeline development, and the critical elements of successful execution. You'll gain practical tools for turning ideas into reality.",
            videoUrl: "https://example.com/video3",
            isCompleted: false
          },
          {
            id: 4,
            title: "Building High-Performance Teams",
            content: "Discover the secrets to building and leading high-performance teams. This module covers team dynamics, motivation strategies, conflict resolution, and creating a culture of excellence. You'll learn how to attract, develop, and retain top talent.",
            videoUrl: "https://example.com/video4",
            isCompleted: false
          }
        ]
      },
      2: {
        id: 2,
        title: "Strategic Management Fundamentals",
        progress: 15,
        certificate: "Available",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=180&fit=crop&crop=faces",
        modules: [
          {
            id: 1,
            title: "Introduction to Strategic Management",
            content: "Master the art of strategic thinking and organizational leadership. This course provides a comprehensive foundation in strategic management principles, frameworks, and best practices used by successful organizations worldwide.",
            videoUrl: "https://example.com/video1",
            isCompleted: false
          },
          {
            id: 2,
            title: "Environmental Analysis",
            content: "Learn how to analyze your organization's external and internal environment. This module covers SWOT analysis, PESTEL framework, competitive analysis, and market research techniques essential for strategic decision-making.",
            videoUrl: "https://example.com/video2",
            isCompleted: false
          },
          {
            id: 3,
            title: "Strategy Formulation",
            content: "Discover how to formulate effective strategies that align with your organization's mission and vision. This module covers different strategic approaches, competitive strategies, and the process of strategy development.",
            videoUrl: "https://example.com/video3",
            isCompleted: false
          }
        ]
      },
      3: {
        id: 3,
        title: "Digital Transformation Leadership",
        progress: 45,
        certificate: "Not Available",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=180&fit=crop&crop=faces",
        modules: [
          {
            id: 1,
            title: "Introduction to Digital Transformation",
            content: "Lead your organization through digital change and innovation. This course equips you with the knowledge and skills needed to navigate digital transformation challenges and opportunities in today's rapidly evolving business landscape.",
            videoUrl: "https://example.com/video1",
            isCompleted: true
          },
          {
            id: 2,
            title: "Technology Trends and Impact",
            content: "Explore emerging technologies and their impact on business operations. This module covers AI, cloud computing, data analytics, IoT, and other key technologies driving digital transformation.",
            videoUrl: "https://example.com/video2",
            isCompleted: true
          },
          {
            id: 3,
            title: "Change Management in Digital Era",
            content: "Learn how to manage organizational change during digital transformation. This module covers change management frameworks, stakeholder engagement, and strategies for overcoming resistance to change.",
            videoUrl: "https://example.com/video3",
            isCompleted: false
          }
        ]
      }
    };

    const selectedCourse = coursesData[courseId] || coursesData[1];
    setCourse(selectedCourse);
    
    // Check if course is enrolled and get progress
    const enrolled = isCourseEnrolled(parseInt(courseId));
    const courseProgress = getCourseProgress(parseInt(courseId));
    setIsEnrolled(enrolled);
    setProgress(courseProgress);
  }, [courseId, isCourseEnrolled, getCourseProgress]);

  const handleModuleSelect = (moduleIndex) => {
    setSelectedModule(moduleIndex);
  };

  const handleMarkComplete = () => {
    if (!isEnrolled) return;
    
    const currentModule = course.modules[selectedModule];
    const moduleId = currentModule.id;
    
    if (isModuleCompleted(parseInt(courseId), moduleId)) {
      unmarkModuleComplete(parseInt(courseId), moduleId);
    } else {
      markModuleComplete(parseInt(courseId), moduleId);
      
      // Check if course is now completed
      const enrolledCourse = enrolledCourses.find(c => c.id === parseInt(courseId));
      if (enrolledCourse) {
        const updatedCompletedModules = [...enrolledCourse.completedModules, moduleId];
        if (updatedCompletedModules.length === course.modules.length) {
          // Course is completed, show completion modal
          setTimeout(() => {
            setShowCompletionModal(true);
          }, 500); // Small delay to show the module completion first
        }
      }
    }
    
    // Update local progress
    const newProgress = getCourseProgress(parseInt(courseId));
    setProgress(newProgress);
  };

  const handleEnrolCourse = () => {
    if (isEnrolled) return;
    
    const result = enrollCourse(parseInt(courseId), course);
    if (result.success) {
      setIsEnrolled(true);
      setProgress(0);
      setShowEnrollmentModal(true);
    } else {
      alert(result.message);
    }
  };

  const handleUnenrollCourse = () => {
    setShowUnenrollModal(true);
  };

  const handleConfirmUnenroll = () => {
    const result = unenrollCourse(parseInt(courseId));
    if (result.success) {
      setIsEnrolled(false);
      setProgress(0);
      setShowEnrollmentModal(false);
      setShowUnenrollModal(false);
      setShowUnenrollSuccessModal(true);
    } else {
      alert(result.message);
    }
  };

  const handleCloseUnenrollModal = () => {
    setShowUnenrollModal(false);
  };

  const handleCloseModal = () => {
    setShowEnrollmentModal(false);
  };

  const handleCloseUnenrollSuccessModal = () => {
    setShowUnenrollSuccessModal(false);
  };

  const handleCloseCompletionModal = () => {
    setShowCompletionModal(false);
  };

  const handleGoToMyCourses = () => {
    setShowCompletionModal(false);
    navigate('/my-courses');
  };

  const handleBackToCourses = () => {
    navigate('/my-courses');
  };

  if (!course) {
    return (
      <div className="dashboard-container">
        <DashboardSidebar />
        <div className="dashboard-main">
          <div className="course-view-container">
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading course...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-main">
        <div className="course-view-wrapper">
          <div className="course-view-container">
            {/* Breadcrumbs - Moved to top level */}
            <div className="breadcrumbs">
              <button onClick={handleBackToCourses} className="back-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                My Courses
              </button>
              <span className="breadcrumb-separator"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.62 7.63755L5.04699 2.32755C4.954 2.2389 4.83046 2.18945 4.70198 2.18945C4.57351 2.18945 4.44997 2.2389 4.35699 2.32755L4.35099 2.33355C4.30575 2.37652 4.26973 2.42825 4.24512 2.48558C4.2205 2.54291 4.20781 2.60466 4.20781 2.66705C4.20781 2.72944 4.2205 2.79118 4.24512 2.84852C4.26973 2.90585 4.30575 2.95758 4.35099 3.00055L9.59899 8.00055L4.35099 12.9985C4.30575 13.0415 4.26973 13.0932 4.24512 13.1506C4.2205 13.2079 4.20781 13.2697 4.20781 13.332C4.20781 13.3944 4.2205 13.4562 4.24512 13.5135C4.26973 13.5708 4.30575 13.6226 4.35099 13.6655L4.35699 13.6715C4.44997 13.7602 4.57351 13.8096 4.70198 13.8096C4.83046 13.8096 4.954 13.7602 5.04699 13.6715L10.62 8.36155C10.669 8.31485 10.708 8.25869 10.7347 8.19646C10.7613 8.13424 10.7751 8.06725 10.7751 7.99955C10.7751 7.93185 10.7613 7.86486 10.7347 7.80263C10.708 7.74041 10.669 7.68425 10.62 7.63755Z" fill="#801323"/>
  </svg></span>
              <span className="breadcrumb-current">{course.title}</span>
            </div>

            {/* Main Content */}
            <div className="course-content">
            {/* Left Column - Course Header, Tabs, and Modules List */}
            <div className="left-column">
              {/* Course Header */}
              <div className="course-header">
                <div className="course-title-section">
                  <h1 className="course-title">{course.title}</h1>
                  <div className="course-meta">
                    <span className="course-progress">Progress: {isEnrolled ? `${progress}%` : 'Not Enrolled'}</span>
                    <span className="course-certificate">Certificate: {progress === 100 ? 'Available' : 'Not Available'}</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="course-tabs">
                <button 
                  className={`tab ${activeTab === 'modules' ? 'active' : ''}`}
                  onClick={() => setActiveTab('modules')}
                >
                  Modules
                </button>
                <button 
                  className={`tab ${activeTab === 'assignments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('assignments')}
                >
                  Assignments
                </button>
                <button 
                  className={`tab ${activeTab === 'resources' ? 'active' : ''}`}
                  onClick={() => setActiveTab('resources')}
                >
                  Resources
                </button>
              </div>

              {/* Modules List */}
              <div className="modules-column">
                <div className="modules-list">
                  {course.modules.map((module, index) => {
                    const isCompleted = isEnrolled && isModuleCompleted(parseInt(courseId), module.id);
                    return (
                      <div 
                        key={module.id} 
                        className={`module-item ${selectedModule === index ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                        onClick={() => handleModuleSelect(index)}
                      >
                        <div className="module-number">{module.id}.</div>
                        <div className="module-title">{module.title}</div>
                        <div className="module-icon">
                          {isCompleted ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M20 6L9 17L4 12" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : selectedModule === index ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M9 18L15 12L9 6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M9 18L15 12L9 6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Module Content */}
            <div className="content-column">
              <div className="module-content">
                <h2 className="module-content-title"><svg width="12" height="30" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.041626 11.8327L4.20829 5.99935L0.041626 0.166016H2.08329L6.24996 5.99935L2.08329 11.8327H0.041626ZM4.99996 11.8327L9.16663 5.99935L4.99996 0.166016H7.04163L11.2083 5.99935L7.04163 11.8327H4.99996Z" fill="#801323"/>
</svg>    {course.modules[selectedModule].title}</h2>
                
                {/* Video/Media Placeholder */}
                <div className="media-placeholder">
                  <div className="placeholder-content">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5V19L19 12L8 5Z" fill="#9CA3AF"/>
                    </svg>
                  </div>
                </div>

                {/* Module Content */}
                <div className="module-text-content">
                  <p>{course.modules[selectedModule].content}</p>
                  <p>{course.modules[selectedModule].content}</p>
                  <p>{course.modules[selectedModule].content}</p>
                  <p>{course.modules[selectedModule].content}</p>
                  <p>{course.modules[selectedModule].content}</p>
                </div>

                {/* Action Buttons */}
                <div className="module-actions">
                  {!isEnrolled ? (
                    <button className="enrol-course-btn" onClick={handleEnrolCourse}>
                      Enrol Course
                    </button>
                  ) : (
                    <>
                      <button 
                        className="mark-complete-btn" 
                        onClick={handleMarkComplete}
                        disabled={!isEnrolled}
                      >
                        {isModuleCompleted(parseInt(courseId), course.modules[selectedModule].id) 
                          ? 'Mark as Incomplete' 
                          : 'Mark as Complete'
                        }
                      </button>
                      <button 
                        className="unenroll-course-btn" 
                        onClick={handleUnenrollCourse}
                      >
                        Unenroll Course
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      <EnrollmentModal
        isOpen={showEnrollmentModal}
        onClose={handleCloseModal}
        courseTitle={course?.title}
        onUnenroll={handleUnenrollCourse}
        isEnrolled={isEnrolled}
      />

      {/* Unenroll Modal */}
      <UnenrollModal
        isOpen={showUnenrollModal}
        onClose={handleCloseUnenrollModal}
        courseTitle={course?.title}
        onConfirmUnenroll={handleConfirmUnenroll}
      />

      {/* Unenroll Success Modal */}
      <UnenrollSuccessModal
        isOpen={showUnenrollSuccessModal}
        onClose={handleCloseUnenrollSuccessModal}
        courseTitle={course?.title}
      />

      {/* Course Completion Modal */}
      <CourseCompletionModal
        isOpen={showCompletionModal}
        onClose={handleCloseCompletionModal}
        courseTitle={course?.title}
        course={course}
        onGoToMyCourses={handleGoToMyCourses}
      />
    </div>
  );
};

export default CourseView;

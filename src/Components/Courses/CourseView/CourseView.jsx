import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardSidebar from '../../LMS/Dashboard/Components/DashboardSidebar';
import { useCart } from '../../../context/CartContext';
import { useCourseContext } from '../../../context/CourseContext.jsx';
import './CourseView.css';

const CourseView = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const { addToCart, isInCart, getCartItem } = useCart();
  const { isCourseEnrolled } = useCourseContext();

  // Course data - in a real app, this would be fetched from an API
  const coursesData = {
    1: {
      id: 1,
      title: "The Visionary Leader's Blueprint",
      description: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio-maladaptent taci sociosqu adoratorquent per conubia nostra.",
      price: "N30,000",
      originalPrice: "N45,000",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&crop=faces",
      duration: "4 weeks / Self-paced",
      format: "Video + Workbook + Live Q&A",
      rating: 4.5,
      level: "Beginner",
      lastUpdated: "7/2025",
      subtitle: "English",
      aboutCourse: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus id nisi interdum, luctus risus ac, faucibus felis. Phasellus sit amet orci ut lorem semper viverra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      learningOutcomes: [
        "Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
        "Per inceptos himenaeos vivamus id nisi interdum, luctus risus ac.",
        "Faucibus felis phasellus sit amet orci ut lorem semper viverra.",
        "Pellentesque habitant morbi tristique senectus et netus et malesuada.",
        "Fames ac turpis egestas nunc vulputate libero et velit interdum."
      ],
      courseBreakdown: [
        "Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
        "Per inceptos himenaeos vivamus id nisi interdum, luctus risus ac.",
        "Faucibus felis phasellus sit amet orci ut lorem semper viverra.",
        "Pellentesque habitant morbi tristique senectus et netus et malesuada.",
        "Bonus: Live Q&A + Leadership Journal PDF"
      ],
      instructor: {
        name: "John Doe",
        title: "Award Winning SEO Agency Owner",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
        bio: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus id nisi interdum, luctus risus ac, faucibus felis. Phasellus sit amet orci ut lorem semper viverra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
      },
      relatedCourses: [
        {
          id: 2,
          title: "Strategic Management Fundamentals",
          price: "N45,000",
          rating: 4.5,
          thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=120&fit=crop&crop=faces"
        },
        {
          id: 3,
          title: "Digital Transformation Leadership",
          price: "N50,000",
          rating: 4.7,
          thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=120&fit=crop&crop=faces"
        },
        {
          id: 4,
          title: "Team Building & Collaboration",
          price: "N35,000",
          rating: 4.3,
          thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=120&fit=crop&crop=faces"
        },
        {
          id: 5,
          title: "Communication Excellence",
          price: "N40,000",
          rating: 4.6,
          thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=120&fit=crop&crop=faces"
        }
      ]
    },
    2: {
      id: 2,
      title: "Strategic Management Fundamentals",
      description: "Master the art of strategic thinking and organizational leadership with comprehensive frameworks and real-world applications.",
      price: "N35,000",
      originalPrice: "N50,000",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop&crop=faces",
      duration: "6 weeks / Self-paced",
      format: "Video + Case Studies + Live Sessions",
      rating: 4.7,
      level: "Intermediate",
      lastUpdated: "8/2025",
      subtitle: "English",
      aboutCourse: "Master the art of strategic thinking and organizational leadership. This comprehensive course provides you with the frameworks, tools, and insights needed to develop and execute effective business strategies. Learn from real-world case studies and industry experts.",
      learningOutcomes: [
        "Develop strategic thinking capabilities and analytical skills",
        "Master strategic planning frameworks and methodologies",
        "Learn to analyze competitive landscapes and market dynamics",
        "Understand resource allocation and strategic decision-making",
        "Build skills in strategic communication and stakeholder management",
        "Apply strategic concepts to real-world business scenarios"
      ],
      courseBreakdown: [
        "Introduction to Strategic Management",
        "Environmental Analysis and Market Research",
        "Strategy Formulation and Planning",
        "Strategy Implementation and Execution",
        "Performance Measurement and Control",
        "Strategic Leadership and Change Management",
        "Bonus: Strategic Planning Toolkit + Live Q&A"
      ],
      instructor: {
        name: "Dr. Sarah Johnson",
        title: "Senior Business Strategy Consultant",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
        bio: "Dr. Sarah Johnson is a seasoned business strategist with over 15 years of experience helping organizations navigate complex strategic challenges. She has worked with Fortune 500 companies and startups alike, developing strategies that drive sustainable growth and competitive advantage."
      },
      relatedCourses: [
        {
          id: 1,
          title: "The Visionary Leader's Blueprint",
          price: "N30,000",
          rating: 4.5,
          thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=120&fit=crop&crop=faces"
        },
        {
          id: 3,
          title: "Digital Transformation Leadership",
          price: "N50,000",
          rating: 4.7,
          thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=120&fit=crop&crop=faces"
        },
        {
          id: 4,
          title: "Team Building & Collaboration",
          price: "N35,000",
          rating: 4.3,
          thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=120&fit=crop&crop=faces"
        },
        {
          id: 5,
          title: "Communication Excellence",
          price: "N40,000",
          rating: 4.6,
          thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=120&fit=crop&crop=faces"
        }
      ]
    },
    3: {
      id: 3,
      title: "Digital Transformation Leadership",
      description: "Lead your organization through digital change and innovation with cutting-edge strategies and practical implementation frameworks.",
      price: "N50,000",
      originalPrice: "N65,000",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop&crop=faces",
      duration: "8 weeks / Self-paced",
      format: "Video + Interactive Labs + Mentorship",
      rating: 4.8,
      level: "Advanced",
      lastUpdated: "9/2025",
      subtitle: "English",
      aboutCourse: "Lead your organization through digital transformation with confidence. This advanced course covers the latest digital trends, transformation methodologies, and leadership strategies needed to drive successful digital initiatives in modern organizations.",
      learningOutcomes: [
        "Master digital transformation frameworks and methodologies",
        "Lead digital change initiatives across organizations",
        "Understand emerging technologies and their business impact",
        "Develop digital-first strategies and implementation plans",
        "Build digital culture and change management capabilities",
        "Navigate digital transformation challenges and opportunities"
      ],
      courseBreakdown: [
        "Digital Transformation Fundamentals",
        "Emerging Technologies and Trends",
        "Digital Strategy Development",
        "Change Management in Digital Era",
        "Data-Driven Decision Making",
        "Digital Culture and Leadership",
        "Implementation and Execution",
        "Bonus: Digital Transformation Playbook + 1-on-1 Mentorship"
      ],
      instructor: {
        name: "Michael Chen",
        title: "Chief Digital Officer & Innovation Expert",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
        bio: "Michael Chen is a digital transformation expert with over 20 years of experience helping organizations embrace digital innovation. As a former Chief Digital Officer at multiple Fortune 500 companies, he brings real-world insights and proven strategies to every course."
      },
      relatedCourses: [
        {
          id: 1,
          title: "The Visionary Leader's Blueprint",
          price: "N30,000",
          rating: 4.5,
          thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=120&fit=crop&crop=faces"
        },
        {
          id: 2,
          title: "Strategic Management Fundamentals",
          price: "N35,000",
          rating: 4.7,
          thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=120&fit=crop&crop=faces"
        },
        {
          id: 4,
          title: "Team Building & Collaboration",
          price: "N35,000",
          rating: 4.3,
          thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=120&fit=crop&crop=faces"
        },
        {
          id: 5,
          title: "Communication Excellence",
          price: "N40,000",
          rating: 4.6,
          thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=120&fit=crop&crop=faces"
        }
      ]
    }
  };

  useEffect(() => {
    const courseData = coursesData[courseId];
    if (courseData) {
      setCourse(courseData);
    } else {
      navigate('/dashboard');
    }
  }, [courseId, navigate]);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleEnrollNow = () => {
    // Block checkout if already enrolled
    if (isCourseEnrolled(course.id)) {
      showToast('You are already enrolled in this course.');
      return;
    }
    navigate(`/checkout/${course.id}`);
  };

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleAddToCart = () => {
    if (course) {
      addToCart(course);
      showToast(`${course.title} added to cart!`);
    }
  };

  const handleRelatedAddToCart = (relatedCourse) => {
    addToCart(relatedCourse);
    showToast(`${relatedCourse.title} added to cart!`);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-view-container">
      <DashboardSidebar />
      <div className="course-view-main">
        {/* Toast Notification */}
        {showNotification && (
          <div className="course-view-toast">
            <div className="course-view-toast-content">
              <span className="course-view-toast-icon">✓</span>
              <span className="course-view-toast-message">{notificationMessage}</span>
            </div>
          </div>
        )}
        {/* Breadcrumbs */}
        <div className="course-view-breadcrumbs">
          <span>My Courses</span>
          <span className="course-view-breadcrumb-separator">&gt;</span>
          <span>{course.title}</span>
        </div>

        {/* Course Header */}
        <div className="course-view-header">
          <h1 className="course-view-title">{course.title}</h1>
          <p className="course-view-description">{course.description}</p>
          <div className="course-view-thumbnail">
            <img src={course.thumbnail} alt={course.title} />
          </div>
        </div>

        {/* Main Content */}
        <div className="course-view-content">
          {/* Left Column */}
          <div className="course-view-left-column">
            {/* About Course */}
            <div className="course-view-section">
              <h2 className="course-view-section-title">About Course</h2>
              <p className="course-view-section-content">{course.aboutCourse}</p>
            </div>

            {/* What You'll Learn */}
            <div className="course-view-section">
              <h2 className="course-view-section-title">What You'll Learn</h2>
              <div className="course-view-learning-outcomes">
                {course.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="course-view-learning-item">
                    <div className="course-view-checkmark">✓</div>
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Breakdown */}
            <div className="course-view-section">
              <h2 className="course-view-section-title">Course Breakdown</h2>
              <div className="course-view-breakdown">
                {course.courseBreakdown.map((item, index) => (
                  <div key={index} className="course-view-breakdown-item">
                    <div 
                      className="course-view-breakdown-header"
                      onClick={() => toggleSection(index)}
                    >
                      <span className="course-view-breakdown-number">{index + 1}.</span>
                      <span className="course-view-breakdown-text">{item}</span>
                      <div className={`course-view-breakdown-arrow ${expandedSections[index] ? 'expanded' : ''}`}>
                        ▼
                      </div>
                    </div>
                    {expandedSections[index] && (
                      <div className="course-view-breakdown-content">
                        <p>Additional details about this section would go here...</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="course-view-section">
              <h2 className="course-view-section-title">Instructor</h2>
              <div className="course-view-instructor-info">
                <div className="course-view-instructor-image">
                  <img src={course.instructor.image} alt={course.instructor.name} />
                </div>
                <div className="course-view-instructor-details">
                  <h3 className="course-view-instructor-name">{course.instructor.name}</h3>
                  <p className="course-view-instructor-title">{course.instructor.title}</p>
                  <p className="course-view-instructor-bio">{course.instructor.bio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="course-view-right-column">
            {/* Purchase Box */}
            <div className="course-view-purchase-box">
              <div className="course-view-price-section">
                <div className="course-view-price">{course.price}</div>
                <div className="course-view-price-type">One-Time Payment</div>
              </div>
              
              <div className="course-view-meta">
                <div className="course-view-meta-item">
                  <div className="course-view-meta-icon">🕒</div>
                  <span>{course.duration}</span>
                </div>
                <div className="course-view-meta-item">
                  <div className="course-view-meta-icon">📹</div>
                  <span>{course.format}</span>
                </div>
                <div className="course-view-meta-item">
                  <div className="course-view-meta-icon">⭐</div>
                  <span>{course.rating}</span>
                </div>
                <div className="course-view-meta-item">
                  <div className="course-view-meta-icon">🎓</div>
                  <span>{course.level}</span>
                </div>
                <div className="course-view-meta-item">
                  <div className="course-view-meta-icon">📅</div>
                  <span>{course.lastUpdated}</span>
                </div>
                <div className="course-view-meta-item">
                  <div className="course-view-meta-icon">🌐</div>
                  <span>{course.subtitle}</span>
                </div>
              </div>

              <div className="course-view-action-buttons">
                <button 
                  className="course-view-enroll-button" 
                  onClick={handleEnrollNow}
                  disabled={isCourseEnrolled(course.id)}
                >
                  {isCourseEnrolled(course.id) ? 'Already Enrolled' : 'Enroll Now'}
                </button>
                <button 
                  className={`course-view-add-to-cart-button ${isInCart(course.id) ? 'in-cart' : ''}`} 
                  onClick={handleAddToCart}
                >
                  {isInCart(course.id) ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>

            {/* Related Courses */}
            <div className="course-view-related-courses">
              <h3 className="course-view-related-title">Users Also Purchased These Courses Together</h3>
              <div className="course-view-related-courses-list">
                {course.relatedCourses.map((relatedCourse) => (
                  <div key={relatedCourse.id} className="course-view-related-course-card">
                    <div className="course-view-related-course-image">
                      <img src={relatedCourse.thumbnail} alt={relatedCourse.title} />
                    </div>
                    <div className="course-view-related-course-info">
                      <h4 className="course-view-related-course-title">{relatedCourse.title}</h4>
                      <div className="course-view-related-course-rating">
                        <span className="rating">⭐ {relatedCourse.rating}</span>
                      </div>
                      <div className="course-view-related-course-price">{relatedCourse.price}</div>
                      <button 
                        className={`course-view-related-add-to-cart ${isInCart(relatedCourse.id) ? 'in-cart' : ''}`}
                        onClick={() => handleRelatedAddToCart(relatedCourse)}
                      >
                        {isInCart(relatedCourse.id) ? '✓ Added' : 'Add to Cart'}
                      </button>
                    </div>
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

export default CourseView;

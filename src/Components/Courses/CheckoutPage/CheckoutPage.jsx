import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardSidebar from '../../LMS/Dashboard/Components/DashboardSidebar';
import { usePayment } from '../../../context/PaymentContext';
import { useCourseContext } from '../../../context/CourseContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { processPayment, isProcessing, error, success, resetPayment } = usePayment();
  const { enrollMultipleCourses, isCourseEnrolled } = useCourseContext();
  
  const [course, setCourse] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showCourseSelector, setShowCourseSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    country: ''
  });
  const [createAccount, setCreateAccount] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Course data - in a real app, this would be fetched from an API
  const coursesData = {
    1: {
      id: 1,
      title: "The Visionary Leader's Blueprint",
      instructor: "John Doe",
      duration: "4 weeks / Self-paced",
      price: "N30,000",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=120&fit=crop&crop=faces"
    },
    2: {
      id: 2,
      title: "Strategic Management Fundamentals",
      instructor: "Dr. Sarah Johnson",
      duration: "6 weeks / Self-paced",
      price: "N35,000",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=120&fit=crop&crop=faces"
    },
    3: {
      id: 3,
      title: "Digital Transformation Leadership",
      instructor: "Michael Chen",
      duration: "8 weeks / Self-paced",
      price: "N50,000",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=120&fit=crop&crop=faces"
    },
    4: {
      id: 4,
      title: "Team Building & Collaboration",
      instructor: "Dr. Emily Watson",
      duration: "5 weeks / Self-paced",
      price: "N35,000",
      thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=120&fit=crop&crop=faces"
    },
    5: {
      id: 5,
      title: "Communication Excellence",
      instructor: "Prof. David Kim",
      duration: "3 weeks / Self-paced",
      price: "N40,000",
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=120&fit=crop&crop=faces"
    },
    6: {
      id: 6,
      title: "Personal Development Mastery",
      instructor: "Dr. Lisa Anderson",
      duration: "6 weeks / Self-paced",
      price: "N45,000",
      thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=120&fit=crop&crop=faces"
    }
  };

  useEffect(() => {
    const courseData = coursesData[courseId];
    if (courseData) {
      setCourse(courseData);
      // Add the initial course to selected courses
      setSelectedCourses([courseData]);
    } else {
      navigate('/courses');
    }
  }, [courseId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter courses based on search query
  const filteredCourses = Object.values(coursesData).filter(courseItem => 
    courseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    courseItem.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add course to selection
  const addCourseToSelection = (courseToAdd) => {
    // Prevent adding courses already enrolled
    if (isCourseEnrolled(courseToAdd.id)) {
      alert(`${courseToAdd.title} is already enrolled and cannot be added.`);
      return;
    }
    if (!selectedCourses.find(course => course.id === courseToAdd.id)) {
      setSelectedCourses(prev => [...prev, courseToAdd]);
    }
    setShowCourseSelector(false);
    setSearchQuery('');
  };

  // Remove course from selection
  const removeCourseFromSelection = (courseIdToRemove) => {
    setSelectedCourses(prev => prev.filter(course => course.id !== courseIdToRemove));
  };

  // Calculate total price
  const calculateTotal = () => {
    return selectedCourses.reduce((total, course) => {
      const price = parseFloat(course.price.replace(/[N,]/g, ''));
      return total + price;
    }, 0);
  };

  const formatPrice = (amount) => {
    return `N${amount.toLocaleString()}`;
  };

  const handleProceedToPayment = async () => {
    try {
      // Validate form data
      if (!formData.fullName || !formData.email || !formData.phone || !formData.country) {
        alert('Please fill in all required fields');
        return;
      }

      // Filter out already-enrolled courses and notify user
      const alreadyEnrolled = selectedCourses.filter(c => isCourseEnrolled(c.id));
      const payableCourses = selectedCourses.filter(c => !isCourseEnrolled(c.id));

      if (alreadyEnrolled.length > 0) {
        alert(`Removed already enrolled course(s):\n- ${alreadyEnrolled.map(c => c.title).join('\n- ')}`);
        setSelectedCourses(payableCourses);
      }

      if (payableCourses.length === 0) {
        alert('All selected courses are already enrolled. Nothing to pay for.');
        return;
      }

      // Process payment with Paystack
      const paymentResult = await processPayment(payableCourses, formData);
      
      if (paymentResult.success) {
        // Prepare purchase information for billing history
        const purchaseInfo = {
          purchaseDate: new Date().toISOString(),
          paymentReference: paymentResult.reference,
          paymentMethod: 'Card'
        };

        // Enroll courses after successful payment with purchase info
        const enrollmentResult = enrollMultipleCourses(payableCourses, purchaseInfo);
        
        if (enrollmentResult.success) {
          setShowPaymentModal(true);
        } else {
          console.error('Enrollment failed:', enrollmentResult.errors);
        }
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const handleRemoveCourse = () => {
    navigate(`/course/${courseId}`);
  };

  const handleAddCourse = () => {
    // In a real app, this might add another course or show course selection
    console.log('Add another course');
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="checkout-page-container">
      <DashboardSidebar />
      <div className="checkout-page-main">
        {/* Breadcrumbs */}
        <div className="checkout-breadcrumbs">
          <span>My Courses</span>
          <span className="checkout-breadcrumb-separator">&gt;</span>
          <span>{course.title}</span>
          <span className="checkout-breadcrumb-separator">&gt;</span>
          <span className="checkout-breadcrumb-current">Check-out</span>
        </div>

        {/* Main Content */}
        <div className="checkout-content">
          {/* Left Column - Main Content */}
          <div className="checkout-left-column">
            <h1 className="checkout-title">Confirm Your Enrollment</h1>

            {/* Course Summary Section */}
            <div className="checkout-section">
              <h2 className="checkout-section-title">Course Summary</h2>
              
              {/* Selected Courses List */}
              <div className="checkout-selected-courses">
                {selectedCourses.map((selectedCourse) => {
                  const isEnrolled = isCourseEnrolled(selectedCourse.id);
                  return (
                    <div key={selectedCourse.id} className={`checkout-course-item ${isEnrolled ? 'enrolled' : ''}`}>
                      <div className="checkout-course-info">
                        <div className="checkout-detail-row">
                          <span className="checkout-detail-label">Title:</span>
                          <span className="checkout-detail-value">{selectedCourse.title}</span>
                          {isEnrolled && (
                            <span className="checkout-enrolled-badge">Already Enrolled</span>
                          )}
                        </div>
                        <div className="checkout-detail-row">
                          <span className="checkout-detail-label">Instructor:</span>
                          <span className="checkout-detail-value">{selectedCourse.instructor}</span>
                        </div>
                        <div className="checkout-detail-row">
                          <span className="checkout-detail-label">Duration:</span>
                          <span className="checkout-detail-value">{selectedCourse.duration}</span>
                        </div>
                        <div className="checkout-detail-row">
                          <span className="checkout-detail-label">Price:</span>
                          <span className="checkout-detail-value">
                            {isEnrolled ? 'Free (Already Enrolled)' : selectedCourse.price}
                          </span>
                        </div>
                      </div>
                      <button 
                        className={`checkout-remove-course-button ${isEnrolled ? 'disabled' : ''}`}
                        onClick={() => !isEnrolled && removeCourseFromSelection(selectedCourse.id)}
                        disabled={isEnrolled}
                        title={isEnrolled ? 'Cannot remove already enrolled course' : 'Remove course'}
                      >
                        {isEnrolled ? 'Enrolled' : 'Remove'}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="checkout-course-actions">
                <button 
                  className="checkout-add-course-button" 
                  onClick={() => setShowCourseSelector(true)}
                >
                  Add Course
                </button>
              </div>
            </div>

            {/* Learner Details Section */}
            <div className="checkout-section">
              <h2 className="checkout-section-title">Learner Details</h2>
              <div className="checkout-form">
                <div className="checkout-form-group">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="e.g John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="checkout-input"
                  />
                </div>
                <div className="checkout-form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g johndoe@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="checkout-input"
                  />
                </div>
                <div className="checkout-form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="0123456789"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="checkout-input"
                  />
                </div>
                <div className="checkout-form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="checkout-input"
                  />
                </div>
                <div className="checkout-form-group">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="checkout-select"
                  >
                    <option value="">Select country</option>
                    <option value="nigeria">Nigeria</option>
                    <option value="ghana">Ghana</option>
                    <option value="kenya">Kenya</option>
                    <option value="south-africa">South Africa</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="checkout-checkbox-group">
                  <label className="checkout-checkbox-label">
                    <input
                      type="checkbox"
                      checked={createAccount}
                      onChange={(e) => setCreateAccount(e.target.checked)}
                      className="checkout-checkbox"
                    />
                    <span className="checkout-checkbox-text">
                      Create an account with these details for easier access later
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="checkout-right-column">
            <div className="checkout-order-summary">
              <h2 className="checkout-order-title">Order Summary</h2>
              
              <div className="checkout-summary-details">
                <div className="checkout-summary-row">
                  <span className="checkout-summary-label">Subtotal:</span>
                  <span className="checkout-summary-value">{formatPrice(calculateTotal())}</span>
                </div>
                <div className="checkout-summary-row">
                  <span className="checkout-summary-label">Discount:</span>
                  <span className="checkout-summary-value">N0</span>
                </div>
                <div className="checkout-summary-row checkout-summary-total">
                  <span className="checkout-summary-label">Total:</span>
                  <span className="checkout-summary-value">{formatPrice(calculateTotal())}</span>
                </div>
              </div>

              <button 
                className="checkout-proceed-button"
                onClick={handleProceedToPayment}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing Payment...' : 'Proceed to Payment'}
              </button>

              <div className="checkout-guarantee">
                <span className="checkout-guarantee-icon">ℹ</span>
                <span className="checkout-guarantee-text">
                  No hidden fees. 30-day refund guarantee.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Selector Modal */}
        {showCourseSelector && (
          <div className="checkout-course-selector-overlay">
            <div className="checkout-course-selector-modal">
              <div className="checkout-course-selector-header">
                <h3 className="checkout-course-selector-title">Add More Courses</h3>
                <button 
                  className="checkout-course-selector-close"
                  onClick={() => {
                    setShowCourseSelector(false);
                    setSearchQuery('');
                  }}
                >
                  ×
                </button>
              </div>
              
              <div className="checkout-course-selector-search">
                <input
                  type="text"
                  placeholder="Search courses by title or instructor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="checkout-course-search-input"
                />
              </div>

              <div className="checkout-course-selector-list">
                {filteredCourses
                  .filter(courseItem => !selectedCourses.find(selected => selected.id === courseItem.id))
                  .map((courseItem) => {
                    const isEnrolled = isCourseEnrolled(courseItem.id);
                    return (
                      <div 
                        key={courseItem.id} 
                        className={`checkout-course-selector-item ${isEnrolled ? 'enrolled' : ''}`}
                        onClick={() => !isEnrolled && addCourseToSelection(courseItem)}
                      >
                        <div className="checkout-course-selector-thumbnail">
                          <img src={courseItem.thumbnail} alt={courseItem.title} />
                        </div>
                        <div className="checkout-course-selector-details">
                          <h4 className="checkout-course-selector-course-title">
                            {courseItem.title}
                            {isEnrolled && (
                              <span className="checkout-course-selector-enrolled-badge">Already Enrolled</span>
                            )}
                          </h4>
                          <p className="checkout-course-selector-instructor">{courseItem.instructor}</p>
                          <p className="checkout-course-selector-duration">{courseItem.duration}</p>
                          <p className="checkout-course-selector-price">
                            {isEnrolled ? 'Free (Already Enrolled)' : courseItem.price}
                          </p>
                        </div>
                        <button 
                          className={`checkout-course-selector-add-button ${isEnrolled ? 'disabled' : ''}`}
                          disabled={isEnrolled}
                          title={isEnrolled ? 'Already enrolled' : 'Add to selection'}
                        >
                          {isEnrolled ? 'Enrolled' : 'Add'}
                        </button>
                      </div>
                    );
                  })}
                
                {filteredCourses.filter(courseItem => !selectedCourses.find(selected => selected.id === courseItem.id)).length === 0 && (
                  <div className="checkout-course-selector-empty">
                    <p>No courses found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Payment Success Modal */}
        {showPaymentModal && success && (
          <div className="checkout-payment-modal-overlay">
            <div className="checkout-payment-modal">
              <div className="checkout-payment-success">
                <div className="checkout-payment-success-icon">✓</div>
                <h3 className="checkout-payment-success-title">Payment Successful!</h3>
                <p className="checkout-payment-success-message">
                  {success.message}
                </p>
                <div className="checkout-payment-success-courses">
                  <h4>Enrolled Courses:</h4>
                  {success.courses.map((course) => (
                    <div key={course.id} className="checkout-payment-course-item">
                      <span className="checkout-payment-course-title">{course.title}</span>
                      <span className="checkout-payment-course-price">{course.price}</span>
                    </div>
                  ))}
                </div>
                <button 
                  className="checkout-payment-success-button"
                  onClick={() => {
                    setShowPaymentModal(false);
                    resetPayment();
                    navigate('/dashboard');
                  }}
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="checkout-error-message">
            <div className="checkout-error-icon">⚠</div>
            <div className="checkout-error-text">{error}</div>
            <button 
              className="checkout-error-close"
              onClick={resetPayment}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

import React from 'react';
import { Link } from 'react-router-dom';

const CoursesSection = ({ courseData, searchQuery }) => {
  const filteredCourseData = courseData.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="courses-section">
      <div className="section-header">
        <h2 className="section-title">My Courses</h2>
        <Link to="/lms/courses" className="view-all-link">View All →</Link>
      </div>
      <div className="courses-grid">
        {filteredCourseData.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-thumbnail">
              <img src={course.thumbnail} alt={course.title} />
            </div>
            <div className="course-content">
              <h3 className="course-title">{course.title}</h3>
              <p className="course-instructor">by {course.instructor}</p>
              <div className="course-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{course.progress}% Complete</span>
              </div>
              <div className="course-meta">
                <span className="course-duration">{course.duration}</span>
                <span className={`course-status ${course.status.toLowerCase().replace(' ', '-')}`}>
                  {course.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesSection;

import React, { useEffect, useState } from "react";
import "./Courses.css";
import { Link } from "react-router-dom";
import openicon from "../../Assets/open-icon.svg";
import { useWaitlist } from "../../../../context/WaitListcontext.jsx";

import course1 from "../../Assets/first-course.png";
import course2 from "../../Assets/second-course.png";
import course3 from "../../Assets/third-course.png";

const Courses = () => {
  const { openWaitlist } = useWaitlist();
  const [courses, setCourses] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Fetch courses.json
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}courses.json`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error loading courses:", err));
  }, []);

  // Track screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageMap = {
    1: course1,
    2: course2,
    3: course3,
    4: course3
  };


  // Card Component
  const CourseCard = ({ id, title, writeup, category }) => {
    return (
      <div className="courses-preview">
        <div className="courses-preview-img">
          <img src={imageMap[id]} alt={title} />
          {category && <span className="course-category">{category}</span>}
        </div>
        <div className="courses-preview-writeup">
          <p>{title}</p>
          <span>{writeup}</span>
        </div>
        <div className="courses-card-bottom">
          <span>₦45,000</span>
          <Link onClick={openWaitlist} className="view-course-link">
            View course
            <img src={openicon} alt="open" />
          </Link>
        </div>
      </div>
    );
  };

  // Slice courses: show all on desktop, only first 3 on mobile unless 4th is specifically allowed
  const displayedCourses = isMobile ? courses.slice(0, 4) : courses.slice(0, 3);


  return (
    <div className="courses-container">
      <div className="courses-header">
        <span>COREAL8 COURSES</span>
      </div>
      <div className="courses-writeup">
        <h1>Start Your Growth Journey</h1>
        <p>
          Curated selection of courses designed to elevate your skills and drive
          organizational success. Each course includes a certificate of
          completion and access to materials
        </p>
      </div>
      <div className="courses-section">
        <div className="featured-button">
          <p>Featured Courses</p>
        </div>
        <div className="courses">
          {displayedCourses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
      <div className="courses-button">
        <Link to="/courses">
          <button className="dark-bg-btn">View All Courses</button>
        </Link>
      </div>
    </div>
  );
};

export default Courses;

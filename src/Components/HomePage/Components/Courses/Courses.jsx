import React from 'react';
import './Courses.css';
import { Link } from "react-router-dom";
import course1 from '../../Assets/first-course.png';
import course2 from '../../Assets/second-course.png';
import course3 from '../../Assets/third-course.png';
import openicon from '../../Assets/open-icon.svg';

const Courses = () => {
    const podcasts = [
            {
                img: course1,
                title: "The Visionary Leader's Blueprint",
                writeup: "Learn how to lead with clarity, courage, and conviction in today’s dynamic world."
            },
            {
                img: course2,
                title: "The Visionary Leader's Blueprint",
                writeup: "Learn how to lead with clarity, courage, and conviction in today’s dynamic world.",
            },
            {
                img: course3,
                title: "The Visionary Leader's Blueprint",
                writeup: "Learn how to lead with clarity, courage, and conviction in today’s dynamic world."
            }
            
        ]
    
        const PodcastCard = ({img, title, writeup}) => {
            return (
              <div className="courses-preview">
                <div className="courses-preview-img">
                  <img src={img} alt="" />
                </div>
                <div className="courses-preview-writeup">
                  <p>{title}</p>
                  <span>{writeup}</span>
                </div>
                <div className='podcardbottom'>
                    <span>
                    ₦45,000
                    </span>
                    <Link to='/contact' className="view-course-link">View course
                        <img src={openicon} />
                    </Link>
                </div>
              </div>
            );
        };
  return (
    <div className="courses-container">
      <div className="courses-header">
        <span>COREAL8 COURSES</span>
      </div>
      <div className="courses-writeup">
        <h1>Start Your Good Journey</h1>
        <p>
          Learn directly from Dr. Ezekiel through high-impact courses built
          around leadership, ethical business, and legacy-building strategies.
        </p>
      </div>
      <div className="courses-section">
        <div className="featured-button">
          <p>Featured Courses</p>
        </div>
        <div className="courses">
          {podcasts.map((podcast, index) => (
            <PodcastCard key={index} {...podcast} />
          ))}

          <div className="courses-preview extra-courses-preview">
            <div className="courses-preview-img">
              <img src={course1} alt="" />
            </div>
            <div className="courses-preview-writeup">
              <p>The Visionary Leader's Blueprint</p>
              <span>
                Learn how to lead with clarity, courage, and conviction in
                today’s dynamic world.
              </span>
            </div>
            <div className="podcardbottom">
              <span>₦45,000</span>
              <Link to="/contact" className="view-course-link">
                View course
                <img src={openicon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="courses-button">
        <button className="dark-bg-btn">View All Courses</button>
      </div>
    </div>
  );
}

export default Courses

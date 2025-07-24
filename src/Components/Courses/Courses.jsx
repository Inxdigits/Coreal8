import React from 'react';
import './Courses.css';
import CoursesMain from './CoursesMain/CoursesMain.jsx'
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import coImage from '../../Assets/co-overview-image.png';

const Courses = () => {
  return (
    <div className="courses-page">
      <Navbar />
      <section className="courses-section">
        <div className="courses-overview">
          <div className="co-writeup">
            <div className="co-writeup-text">
              <h1>Grow with Purpose. Lead with Clarity.</h1>
              <span>
                Explore high-impact masterclasses designed to equip you with
                practical tools for ethical leadership, lifestyle balance, and
                legacy creation — all led by Dr. Enobong Ezekiel through the
                Coreal8 platform.
              </span>
            </div>
            <div className="co-writeup-buttons">
              <button className="dark-bg-btn">Start a Course</button>
              <div className="gradient-button-container">
                <button className="gradient-button card-button">Login</button>
              </div>
            </div>
          </div>
          <div className="co-right-side">
            <img src={coImage} alt="Contact Overview Image" />
          </div>
        </div>
        <CoursesMain />
      </section>
      <Footer />
    </div>
  );
}

export default Courses

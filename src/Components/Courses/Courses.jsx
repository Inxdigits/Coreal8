import React from 'react';
import './Courses.css';
import CoursesMain from './CoursesMain/CoursesMain.jsx';
import CoursesSlider from "./CoursesSlider/CoursesSlider.jsx";
import Faqs from "./Faqs/Faqs.jsx";
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import coImage from '../../Assets/co-overview-image.png';
import johndoe from "../../Assets/john-doe.png";

const Courses = () => {
  return (
    <div className="courses-page">
      <Navbar />
      <section className="courses-overview">
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
      </section>
      <section className="courses-section">
        <CoursesMain />
      </section>
      <section className="courses-testimonial flex-column">
        <div className="section-header">
          <span>TESTIMONIALS</span>
        </div>
        <div className="ct-intro">
          <h1>Real Stories. Lasting Growth.</h1>
          <p>
            A few words from the voices who’ve worked with, learned from, or
            been inspired by Dr. Ezekiel.
          </p>
        </div>
        <div className="ct-slider-container">
          <CoursesSlider />
        </div>
      </section>
      <section className="faqs-container flex-column section-container">
        <div className="section-header">
          <span>FAQs</span>
        </div>
        <div className="faqs-intro">
          <h1>Frequently Asked Questions</h1>
        </div>
        <Faqs />
      </section>
      <section className="last-container section-container flex-column">
        <div className="lc-images">
          <img src={johndoe} alt="" />
          <img src={johndoe} alt="" />
          <img src={johndoe} alt="" style={{ zIndex: "2" }} />
          <img src={johndoe} alt="" style={{ zIndex: "1" }} />
          <img src={johndoe} alt="" />
        </div>
        <div className="lc-text">
          <h1>
            Your journey to impact starts here. <br /> Ready to lead with
            purpose?
          </h1>
        </div>
        <div className="lc-button-container">
          <button className="lc-button gradient-button">Start Courses</button>
        </div>

        <div className="icon-3"></div>
        <div className="icon-4"></div>
      </section>
      <Footer />
    </div>
  );
}

export default Courses

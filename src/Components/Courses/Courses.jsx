import React from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";
import CoursesMain from "./CoursesMain/CoursesMain.jsx";
import CoursesSlider from "./CoursesSlider/CoursesSlider.jsx";
import Faqs from "./Faqs/Faqs.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import johndoe from "../../Assets/john-doe.png";
import joydoe from "../../Assets/CoursesPageAssets/joydoe.png";
import janetdoe from "../../Assets/CoursesPageAssets/janetdoe.png";
import julietdoe from "../../Assets/CoursesPageAssets/julietdoe.png";
import juliusdoe from "../../Assets/CoursesPageAssets/juliusdoe.png";
import coImage from "../../Assets/Frame179.png";
import { useWaitlist } from "../../context/WaitListcontext.jsx";

const Courses = () => {
  const { openWaitlist } = useWaitlist();

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="courses-page">
      <Navbar />
      <div className="page-content">
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
              <button onClick={openWaitlist} className="dark-bg-btn">
                Start a Course
              </button>
              <div className="gradient-button-container learn-more courses-login-btn-container">
                <button
                  onClick={handleNavigate}
                  className="gradient-button lm-button courses-login-btn"
                >
                  Login
                </button>
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
          <div className="tc section-header">
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
          <div className="tc section-header">
            <span>FAQs</span>
          </div>
          <div className="faqs-intro">
            <h1>Frequently Asked Questions</h1>
          </div>
          <Faqs />
        </section>
        <section className="last-container section-container flex-column">
          <div className="lc-images">
            <img src={joydoe} alt="" />
            <img src={janetdoe} alt="" />
            <img src={johndoe} alt="" style={{ zIndex: "2" }} />
            <img src={julietdoe} alt="" style={{ zIndex: "1" }} />
            <img src={juliusdoe} alt="" />
          </div>
          <div className="lc-text">
            <h1>
              Your journey to impact starts here. <br /> Ready to lead with
              purpose?
            </h1>
          </div>
          <div className="lc-button-container">
            <button
              onClick={openWaitlist}
              className="lc-button gradient-button"
            >
              Start Courses
            </button>
          </div>

          <div className="icon-3"></div>
          <div className="icon-4"></div>
        </section>

        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑ Back to Top
        </button>

        <Footer />
      </div>
    </div>
  );
};

export default Courses;

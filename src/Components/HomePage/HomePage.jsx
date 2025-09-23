import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Navbar from '../Navbar/Navbar.jsx';
import Overview from './Components/Overview/Overview.jsx';
import AboutUs from './Components/AboutUs/AboutUs.jsx';
import StoryBehind from "./Components/StoryBehind/StoryBehind.jsx";
import Services from "./Components/Services/Services.jsx";
import Trust from "./Components/Trust/Trust.jsx";
import Podcast from "./Components/Podcast/Podcast.jsx";
import Courses from "./Components/Courses/Courses.jsx";
import Leadership from "./Components/Leadership/Leadership.jsx";
import Blogs from "./Components/Blogs/Blogs.jsx";
import Testimonial from "./Components/Testimonial/Testimonial.jsx";
import BookAppointment from "./Components/BookAppointment/BookAppointment.jsx";
import Faqs from './Components/Faqs/Faqs.jsx';
import Footer from '../Footer/Footer.jsx';

const HomePage = () => {
  const [showBackToTop, setShowBackToTop] = useState()
  
    // 🔹 Scroll listener for Back-to-Top
    useEffect(() => {
      const handleScroll = () => {
        setShowBackToTop(window.scrollY > 300);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  return (
    <div className="home">
      <Navbar />
      <Overview />
      <AboutUs />
      <StoryBehind />
      <Services />
      <Trust />
      <Courses />
      <Podcast />
      {/* <Leadership /> */}
      <Blogs />
      <Testimonial />
      <BookAppointment />
      <section className="faqs-container flex-column section-container">
        <div className="section-header">
          <span>FAQs</span>
        </div>
        <div className="faqs-intro">
          <h1>Frequently Asked Questions</h1>
        </div>
        <Faqs />
      </section>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑ Back to Top
        </button>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
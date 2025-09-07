import React from 'react';
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
import Faqs from '../Courses/Faqs/Faqs.jsx';
import Footer from '../Footer/Footer.jsx';

const HomePage = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="page-content">
        <Overview />
      <AboutUs />
      <StoryBehind />
      <Services />
      <Trust />
      <Podcast />
      <Courses />
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
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
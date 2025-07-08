import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Overview from './Components/Overview/Overview.jsx';
import AboutUs from './Components/AboutUs/AboutUs.jsx';
import StoryBehind from "./Components/StoryBehind/StoryBehind.jsx";
import Services from "./Components/Services/Services.jsx";
import Trust from "./Components/Trust/Trust.jsx";
import Podcast from "./Components/Podcast/Podcast.jsx";
import Courses from "./Components/Courses/Courses.jsx";
import Leadership from "./Components/Leadership/Leadership.jsx";
import Footer from '../Footer/Footer.jsx';

const HomePage = () => {
  return (
    <div className="home">
        <Navbar />
        <Overview />
        <AboutUs />
        <StoryBehind />
        <Services />
        <Trust />
        <Podcast />
        <Courses />
        <Leadership />

        <Footer />
    </div>
  );
};

export default HomePage;
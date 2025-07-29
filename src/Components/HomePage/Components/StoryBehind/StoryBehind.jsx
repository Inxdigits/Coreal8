import React from 'react';
import { Link } from "react-router-dom";
import './StoryBehind.css';
// import left from '../../Assets/left-story-image-resized.jpg';
import right from '../../Assets/right-story-image.png';

const StoryBehind = () => {
  return (
    <div className="story-container">
      <div className="story-header">
        <span className="story-container-header">ABOUT US</span>
      </div>
      <div className="story-text">
        <h1>About Coreal8</h1>
        <p>
          At Coreal8, we believe in the profound power of self-discovery and
          strategic growth. Our foundational philosophy, captured in our driving
          purpose – Empowering Minds, Shaping Futures – reflects our commitment
          to fostering well-being, success, and authentic influence at every
          level. <br /> <br /> We are a pioneering firm dedicated to unlocking
          potential, whether it's through the journey of individual
          transformation or the strategic evolution of an entire organization.
          We understand that true growth begins within and radiates outward,
          impacting personal lives, professional environments, and broader
          communities...
        </p>
        <div className="learn-more">
          <Link to="/about">
            <button className="lm-button">Learn More</button>
          </Link>
        </div>
      </div>
      <div className="story-images">
        <div className="left-story-image">
          <span>
            “Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.”
          </span>
        </div>
        <div className="right-story-image">
          <img src={right} alt="" />
        </div>
      </div>
    </div>
  );
}

export default StoryBehind

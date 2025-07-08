import React from 'react';
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
        <h1>The Story Behind Coreal8</h1>
        <div className="story-flex">
          <p>
            Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.Vorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
            libero et velit interdum, ac aliquet odio mattis.Vorem ipsum dolor
            sit amet, consectetur adipiscing elit. Nunc vulputate libero et
            velit interdum, ac aliquet odio mattis.Vorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <div className="learn-more">
            <button className="lm-button">Learn More...</button>
          </div>
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

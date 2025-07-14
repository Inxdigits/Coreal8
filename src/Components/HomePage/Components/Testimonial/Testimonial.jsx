import React from 'react';
import './Testimonial.css';
import Slider from './Slider/Slider.jsx';

const Testimonial = () => {
  return (
    <div className="testimonial-container container">
      <div className="">
        <div className="header">
          <span>TESTIMONIAL</span>
        </div>
        <div className="testimonial-writeup">
          <h1>What Others are Saying!</h1>
          <p>
            A few words from the voices who’ve worked with, learned from, or
            been inspired by Dr. Ezekiel.
          </p>
        </div>
      </div>
      <div className="">
        <Slider />
      </div>
    </div>
  );
}

export default Testimonial

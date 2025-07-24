import React from 'react';
import '../../Reuse.css';
import './BookAppointment.css';
import appImage from '../../Assets/appointment-image.png';

const BookAppointment = () => {
  return (
    <div className="appointment-container">
      <div className="leftside">
        <div className="appointment-writeup">
          <h1>Book Dr. Enobong Ezekiel</h1>
          <p>
            For keynote sessions, panels, workshops, and coaching
            collaborations, Dr. Ezekiel brings clarity, experience, and impact
            to every space.
          </p>
        </div>
        <div className="appointment-button-container">
          <button className="appointment-button">Book Counseling</button>
        </div>
      </div>
      <div className="rightside">
        <img src={appImage} alt="" />
      </div>

      {/* Decorative Icons */}
      <div className="icon3 w-8 h-8 bg-blue-200 rounded-full absolute top-0 left-0 opacity-50"></div>
      <div className="icon4 w-12 h-12 bg-purple-200 rounded-full absolute bottom-0 right-0 opacity-50"></div>
      <div className="icon5 w-10 h-10 bg-green-200 rounded-full absolute top-1/4 right-1/4 opacity-50"></div>
      <div className="icon6 w-6 h-6 bg-yellow-200 rounded-full absolute bottom-1/4 left-1/4 opacity-50"></div>
      {/* <div className="icon7 w-14 h-14 bg-red-200 rounded-full absolute top-1/2 left-1/2 opacity-50"></div> */}
    </div>
  );
}

export default BookAppointment

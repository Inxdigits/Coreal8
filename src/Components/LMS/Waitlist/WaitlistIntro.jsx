import React from "react";

const WaitlistIntro = ({ logo }) => {
  return (
    <div className="waitlist-form-content">
      <img src={logo} alt="Coreal8 logo" className="waitlist-logo" />

      <div className="waitlist-form-intro-text">
        <h2 id="waitlist-title">
          Get <span className="highlight">Early Access</span> to{" "}
          <span className="highlight">Coreal8 Programs</span>
        </h2>
        <p>
          We’re almost ready to launch a transformational platform for courses,
          mentorship, coaching, and counseling.
          <br />
          Join our waitlist to be the first to know when enrollment opens!
        </p>
      </div>
    </div>
  );
};

export default WaitlistIntro;

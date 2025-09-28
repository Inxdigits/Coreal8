import React, { useState } from "react";
import './BookingPage.css';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const BookingPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    interests: "",
    support: "",
    date: "",
    time: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // reset form
    setFormData({
      fullName: "",
      email: "",
      interests: "",
      support: "",
      date: "",
      time: "",
    });

    // show success popup
    setShowPopup(true);
    setFadeOut(false);

    // trigger fade-out after 5s
    setTimeout(() => {
      setFadeOut(true);
      // remove from DOM after fade animation (0.5s)
      setTimeout(() => setShowPopup(false), 500);
    }, 5000);
  };

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => setShowPopup(false), 500);
  };

  return (
    <div className="bp-container">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="blog-hero">
          <header className="hero-inner">
            <h1 className="hero-title">Book a Discovery Call</h1>
            <p className="hero-sub">
              We’re excited to learn more about you and explore how Coreal8 can
              support your journey. Please fill out the form below to schedule
              your complimentary 30-minute discovery session.
            </p>
          </header>
        </section>

        {/* Form Section */}
        <section className="booking-mechanism">
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="bf-input-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="e.g John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="bf-input-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="e.g johndoe@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="bf-input-field">
              <label htmlFor="interests">
                What area(s) are you interested in?
              </label>
              <select
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                required
              >
                <option value="">Select an option</option>
                <option value="leadership">Leadership</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="legacy">Legacy</option>
              </select>
            </div>

            <div className="bf-input-field textarea-if">
              <label htmlFor="support">What would you like support with?</label>
              <textarea
                id="support"
                name="support"
                placeholder="Share your current goals, challenges or questions..."
                rows="4"
                value={formData.support}
                onChange={handleChange}
                required
              />
            </div>

            <div className="bf-input-field">
              <label>Preferred Date & Time</label>
              <div className="dflex">
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
                <input
                  id="time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="partner-button-container">
              <button type="submit" className="partner-button">
                Book Session
              </button>
            </div>
          </form>
          <div className="booking-info">
            <div className="booking-info-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 17C12.2833 17 12.521 16.904 12.713 16.712C12.905 16.52 13.0007 16.2827 13 16V12C13 11.7167 12.904 11.4793 12.712 11.288C12.52 11.0967 12.2827 11.0007 12 11C11.7173 10.9993 11.48 11.0953 11.288 11.288C11.096 11.4807 11 11.718 11 12V16C11 16.2833 11.096 16.521 11.288 16.713C11.48 16.905 11.7173 17.0007 12 17ZM12 9C12.2833 9 12.521 8.904 12.713 8.712C12.905 8.52 13.0007 8.28267 13 8C12.9993 7.71733 12.9033 7.48 12.712 7.288C12.5207 7.096 12.2833 7 12 7C11.7167 7 11.4793 7.096 11.288 7.288C11.0967 7.48 11.0007 7.71733 11 8C10.9993 8.28267 11.0953 8.52033 11.288 8.713C11.4807 8.90567 11.718 9.00133 12 9ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88334 20.6867 5.825 19.9743 4.925 19.075C4.025 18.1757 3.31267 17.1173 2.788 15.9C2.26333 14.6827 2.00067 13.3827 2 12C1.99933 10.6173 2.262 9.31733 2.788 8.1C3.314 6.88267 4.02633 5.82433 4.925 4.925C5.82367 4.02567 6.882 3.31333 8.1 2.788C9.318 2.26267 10.618 2 12 2C13.382 2 14.682 2.26267 15.9 2.788C17.118 3.31333 18.1763 4.02567 19.075 4.925C19.9737 5.82433 20.6863 6.88267 21.213 8.1C21.7397 9.31733 22.002 10.6173 22 12C21.998 13.3827 21.7353 14.6827 21.212 15.9C20.6887 17.1173 19.9763 18.1757 19.075 19.075C18.1737 19.9743 17.1153 20.687 15.9 21.213C14.6847 21.739 13.3847 22.0013 12 22Z"
                  fill="#0D0C12"
                />
              </svg>
            </div>
            <div className="booking-bulletpoints">
              <ol>
                <li>
                  Discovery calls are held via Zoom or Google Meet (a link will
                  be sent after confirmation).
                </li>
                <li>
                  Please check your email for your appointment confirmation and
                  add it to your calendar.
                </li>
                <li>
                  If you need to reschedule, reply to your confirmation email at
                  least 24 hours in advance.
                </li>
              </ol>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Popup Modal */}
      {showPopup && (
        <div
          className={`popup-overlay ${fadeOut ? "fade-out" : ""}`}
          onClick={handleClose}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()} // prevent close on inner click
          >
            <h2>🎉 Success!</h2>
            <p>Your booking has been submitted successfully.</p>
            <button className="close-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;

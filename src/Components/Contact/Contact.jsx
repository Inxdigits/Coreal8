import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import './Contact.css';
// import contactIcon from '../HomeAssets/contact-icon.jpg';
import phoneIcon from '../../Assets/ContactPageAssets/phone-icon.svg';
import emailIcon from '../../Assets/ContactPageAssets/email-icon.svg';
import chatIcon from '../../Assets/ContactPageAssets/chat-icon.svg';
import thankYouIcon from '../../Assets/ContactPageAssets/thankyou.png';
import ig from '../../Assets/ig-logo.svg';
import linkedin from '../../Assets/linkedin-logo.svg';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isValid, setIsValid] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showError, setShowError] = useState(false); // ✅ New error notification state

  useEffect(() => {
    const { fullName, email, subject, message } = formData;
    const isNameValid = fullName.trim().split(/\s+/).length >= 2;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isSubjectValid = subject !== '';
    const isMessageValid = message.trim().length >= 2;
    const newIsValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;
    setIsValid(newIsValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setShowError(false); // ✅ Hide error
      setShowThankYou(true); // Show thank-you screen
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowError(true); // ✅ Show error if form incomplete
    }
  };

  const handleClose = () => {
    setShowThankYou(false);
    setFormData({ fullName: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      {!showThankYou ? (
        <>
          <div className="contact-content">
            <div className="header">
              <span>CONTACT US</span>
            </div>
            <div className="contact-intro-text">
              <h2 className="contact-title">We’d love to hear from you</h2>
              <p className="contact-text">
                Whether you have questions about our programs, need help finding
                the right service, or want to explore a collaboration, we’re
                here to support you.
              </p>
            </div>
          </div>

          <div className="contact-cards">
            <div className="contact-card">
              <img src={phoneIcon} alt="Phone Icon" className="card-icon" />
              <div className="card-main">
                <div className="card-text">
                  <h3 className="card-title">Contact Us</h3>
                  <ul id="liststyledisc">
                    <li className="card-subtitle">Monday - Friday from 9:00 AM - 6:00 PM (WAT)</li>
                    <li className="card-subtitle"> Saturdays: 10:00 AM – 2:00 PM</li>
                  </ul>
                </div>
                <p className="card-detail">099200399012</p>
              </div>
            </div>
            <div className="contact-card">
              <img src={emailIcon} alt="Email Icon" className="card-icon" />
              <div className="card-main">
                <div className="card-text">
                  <h3 className="card-title">Email Us</h3>
                  <p className="card-subtitle">Send us an email</p>
                </div>
                <p className="card-detail">info@coreal8.com</p>
              </div>
            </div>
            <div className="contact-card">
              <img src={chatIcon} alt="Chat Icon" className="card-icon" />
              <div className="card-main">
                <div className="card-text">
                  <h3 className="card-title">Chat Us</h3>
                  <p className="card-subtitle">Chat us on WhatsApp</p>
                </div>
                <div className="bottom-card-link">
                  <p className="card-detail">099200399012</p>
                  <div className="card-socials">
                    <img src={ig} alt="" />
                    <img src={linkedin} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <div className="contact-form">
              <h2 className="form-title">
                Send a Message
              </h2>
              <h4 className="form-subtitle">
                Vorem ipsum dolor sit amet, consectetur adipiscing elit.
              </h4>
              <form onSubmit={handleSubmit} className="">
                <label for="" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g John Doe"
                  className="form-input"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <label for="" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g johndoe@email.com"
                  className="form-input"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label for="" className="form-label">
                  Subject
                </label>
                <select
                  className="form-select"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="general">General</option>
                  <option value="support">Support</option>
                  <option value="feedback">Feedback</option>
                </select>
                <label for="" className="form-label">
                  Message
                </label>
                <textarea
                  placeholder="Type here..."
                  className="form-textarea h-32"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  style={{resize: "none"}}
                ></textarea>

                <button
                  type="submit"
                  className={`form-submit w-full p-3 rounded-md text-white font-medium ${
                    isValid
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!isValid}
                >
                  Send Message
                </button>

                {/* ✅ Error Notification */}
                {showError && (
                  <div className="form-error text-red-600 font-medium mt-2">
                    Please fill out empty details
                  </div>
                )}
              </form>

              {/* Decorative Icons */}
              <div className="icon3 w-8 h-8 bg-blue-200 rounded-full absolute top-0 left-0 opacity-50"></div>
              <div className="icon4 w-12 h-12 bg-purple-200 rounded-full absolute bottom-0 right-0 opacity-50"></div>
              <div className="icon5 w-10 h-10 bg-green-200 rounded-full absolute top-1/4 right-1/4 opacity-50"></div>
              <div className="icon6 w-6 h-6 bg-yellow-200 rounded-full absolute bottom-1/4 left-1/4 opacity-50"></div>
              <div className="icon7 w-14 h-14 bg-red-200 rounded-full absolute top-1/2 left-1/2 opacity-50"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="thank-you-screen">
          <div className="thank-you-content">
            <img
              src={thankYouIcon}
              alt="Thank You Icon"
              className="thank-you-icon"
            />
            <h2 className="thank-you-heading">
              Thank you for reaching out,
              <br />
              we are excited to chat!
            </h2>
            <p className="thank-you-text">We will reach out to you soon!</p>
            <button className="thank-you-close-btn" onClick={handleClose}>
              Close
            </button>
          </div>

          {/* Decorative Icons */}
          <div className="icon3 w-8 h-8 bg-blue-200 rounded-full absolute top-0 left-0 opacity-50"></div>
          <div className="icon4 w-12 h-12 bg-purple-200 rounded-full absolute bottom-0 right-0 opacity-50"></div>
          <div className="icon5 w-10 h-10 bg-green-200 rounded-full absolute top-1/4 right-1/4 opacity-50"></div>
          <div className="icon6 w-6 h-6 bg-yellow-200 rounded-full absolute bottom-1/4 left-1/4 opacity-50"></div>
          <div className="icon7 w-14 h-14 bg-red-200 rounded-full absolute top-1/2 left-1/2 opacity-50"></div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Contact;

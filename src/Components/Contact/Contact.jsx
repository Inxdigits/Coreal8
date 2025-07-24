import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import './Contact.css';
// import contactIcon from '../HomeAssets/contact-icon.jpg';
import phoneIcon from '../../Assets/ContactPageAssets/phone-icon.svg';
import emailIcon from '../../Assets/ContactPageAssets/email-icon.svg';
import chatIcon from '../../Assets/ContactPageAssets/chat-icon.svg';
import thankYouIcon from '../../Assets/ContactPageAssets/thankyou.png';

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
          <div className="contact-content container mx-auto px-4 py-12">
            <div className="gradient-line h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-6"></div>
            <h1 className="contact-title text-4xl font-bold text-gray-800 mb-4">CONTACT US</h1>
            <h2 className="connect-title text-2xl font-semibold text-gray-700 mb-6">Let's Connect</h2>
            <p className="contact-text text-gray-600 max-w-2xl mx-auto">
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac 
              aliquet odio mattis.
            </p>
          </div>

          <div className="contact-cards container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="contact-card bg-white p-6 rounded-lg shadow-md text-center">
              <img src={phoneIcon} alt="Phone Icon" className="card-icon w-12 h-12 mx-auto mb-4" />
              <h3 className="card-title text-xl font-semibold text-gray-800">Call Us</h3>
              <p className="card-subtitle text-gray-600">Mon-Sat from 9:00am-5:00pm</p>
              <p className="card-detail text-blue-600 font-medium">099200399012</p>
            </div>
            <div className="contact-card bg-white p-6 rounded-lg shadow-md text-center">
              <img src={emailIcon} alt="Email Icon" className="card-icon w-12 h-12 mx-auto mb-4" />
              <h3 className="card-title text-xl font-semibold text-gray-800">Email Us</h3>
              <p className="card-subtitle text-gray-600">Send us an email</p>
              <p className="card-detail text-blue-600 font-medium">info@coreal8.com</p>
            </div>
            <div className="contact-card bg-white p-6 rounded-lg shadow-md text-center">
              <img src={chatIcon} alt="Chat Icon" className="card-icon w-12 h-12 mx-auto mb-4" />
              <h3 className="card-title text-xl font-semibold text-gray-800">Chat Us</h3>
              <p className="card-subtitle text-gray-600">Chat us on WhatsApp</p>
              <p className="card-detail text-blue-600 font-medium">099200399012</p>
            </div>
          </div>

          <div className="contact-form container mx-auto px-4 pb-12">
            <h2 className="form-title text-2xl font-semibold text-gray-800 mb-4">Send a Message</h2>
            <h4 className="form-subtitle text-gray-600 mb-6">Vorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <span className="form-label text-gray-700 font-medium">Full Name</span>
              <input
                type="text"
                placeholder="e.g John Doe"
                className="form-input w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <span className="form-label text-gray-700 font-medium">Email Address</span>
              <input
                type="email"
                placeholder="e.g johndoe@email.com"
                className="form-input w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="form-label text-gray-700 font-medium">Subject</span>
              <select
                className="form-select w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="" disabled>Select</option>
                <option value="general">General</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
              </select>
              <span className="form-label text-gray-700 font-medium">Message</span>
              <textarea
                placeholder="Type here..."
                className="form-textarea w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button
                type="submit"
                className={`form-submit w-full p-3 rounded-md text-white font-medium ${
                  isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
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
        </>
      ) : (
        <div className="thank-you-screen">
          <div className="thank-you-content">
            <img src={thankYouIcon} alt="Thank You Icon" className="thank-you-icon" />
            <h2 className="thank-you-heading">Thank you for reaching out,<br />we are excited to chat!</h2>
            <p className="thank-you-text">We will reach out to you soon!</p>
            <button className="thank-you-close-btn" onClick={handleClose}>Close</button>
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

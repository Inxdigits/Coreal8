import React from 'react';
import Navbar from '../../../Navbar/Navbar.jsx';
import Footer from '../../../Footer/Footer.jsx';
import './Contact.css';
import contactIcon from '../HomeAssets/contact-icon.jpg'; // Adjust the path as necessary
import phoneIcon from '../HomeAssets/phone-icon.svg'; // Placeholder SVG path
import emailIcon from '../HomeAssets/email-icon.svg'; // Placeholder SVG path
import chatIcon from '../HomeAssets/chat-icon.svg'; // Placeholder SVG path

const Contact = () => {
  return (
    <div className="contact-page">
      <Navbar />
      <div className="contact-content">
        {/* <img src={contactIcon} alt="Contact Icon" className="contact-icon" /> */}
        <div className="gradient-line"></div>
        <h1 className="contact-title">CONTACT US</h1>
        <h2 className="connect-title">Let's Connect</h2>
        <p className="contact-text">
          Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac 
          aliquet odio mattis.
        </p>
      </div>
      <div className="contact-cards">
        <div className="contact-card">
          <img src={phoneIcon} alt="Phone Icon" className="card-icon" />
          <h3 className="card-title">Call Us</h3>
          <p className="card-subtitle">Mon-Sat from 9:00am-5:00pm</p>
          <p className="card-detail">099200399012</p>
        </div>
        <div className="contact-card">
          <img src={emailIcon} alt="Email Icon" className="card-icon" />
          <h3 className="card-title">Email Us</h3>
          <p className="card-subtitle">Send us an email</p>
          <p className="card-detail">info@coreal8.com</p>
        </div>
        <div className="contact-card">
          <img src={chatIcon} alt="Chat Icon" className="card-icon" />
          <h3 className="card-title">Chat Us</h3>
          <p className="card-subtitle">Chat us on WhatsApp</p>
          <p className="card-detail">099200399012</p>
        </div>
      </div>
      <div className="contact-form">
        <h2 className="form-title">Send a Message</h2>
        <h4 className='form-subtitle'>Vorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
        <form>
          <span className='form-label'>Full Name</span>
          <input type="text" placeholder="e.g John Doe" className="form-input" />
          <span className='form-label'>Email Address</span>
          <input type="email" placeholder="e.g johndoe@email.com" className="form-input" />
          <span className='form-label'>Subject</span>
          <select placeholder="Select" className="form-select" defaultValue="">
            <option value="" disabled>Select</option>
          </select>
          <span className='form-label'>Message</span>
          <textarea placeholder="Type here..." className="form-textarea"></textarea>
          <button type="submit" className="form-submit">Send Message</button>
        </form>
        <div className="icon3"></div>
        <div className="icon4"></div>
        <div className="icon5"></div>
        <div className="icon6"></div>
        <div className="icon7"></div> 
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
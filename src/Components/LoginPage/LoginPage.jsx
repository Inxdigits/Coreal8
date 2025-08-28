import React, { useState } from 'react';
import './LoginPage.css';
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    role: "",
    partnershipType: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-main">
        <button className="close-btn">
          <Link to="/">X</Link>
        </button>
        <div
          className="modal-content fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-intro-text">
            <h2>Partner with Coreal8</h2>
            <p>
              We’re excited about the possibility of working together! Please
              fill out the short form below to tell us more about you, your
              organization, and how you'd like to collaborate with Coreal8.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="e.g johndoe@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="company">Organization / Company Name</label>
            <input
              type="text"
              name="company"
              placeholder="e.g Power House"
              value={formData.company}
              onChange={handleChange}
            />

            <label htmlFor="role">Your Role / Title</label>
            <input
              type="text"
              name="role"
              placeholder="e.g C.E.O"
              value={formData.role}
              onChange={handleChange}
              required
            />

            <label htmlFor="partnershipType">Type of Partnership</label>
            <select
              name="partnershipType"
              value={formData.partnershipType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Partnership:
              </option>
              <option value="Healthcare Provider or Clinic">
                Healthcare Provider or Clinic
              </option>
              <option value="HR Department / EAP">HR Department / EAP</option>
              <option value="Industry Association">Industry Association</option>
              <option value="Media / Podcast">Media / Podcast</option>
              <option value="Personal Brand Creator">
                Personal Brand Creator
              </option>
              <option value="Community Organization">
                Community Organization
              </option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="message">
              How would you like to partner with us?
            </label>
            <textarea
              name="message"
              placeholder="Tell us a bit about your goals and how we might collaborate"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="modal-submit-button">
              Submit Interest
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage

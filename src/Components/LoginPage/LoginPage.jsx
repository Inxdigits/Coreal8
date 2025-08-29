import React, { useState } from 'react';
import './LoginPage.css';
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import emailjs from "emailjs-com";
import coreal8Logo from "../../Assets/login-logo.png"

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
      <div className="login-main modal-backdrop">
        <button className="close-btn" style={{ color: "white" }}>
          <Link to="/">X</Link>
        </button>
        <div
          className="modal-content fade-in login-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={coreal8Logo} alt="" className="login-logo" />
          <div className="modal-intro-text">
            <h2>Welcome Back!</h2>
            <p>
              Log in to access your courses, dashboard, and exclusive content.
            </p>
          </div>
          <GoogleLogin 
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse)}
              }
              onError={() => console.log("Login Failed")}
            />
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

            <button type="submit" className="modal-submit-button">
              Submit Interest
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage

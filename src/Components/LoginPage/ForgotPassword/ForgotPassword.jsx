import React, { useState } from "react";
import './ForgotPassword.css';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../Firebase/Firebase.js"; 
import coreal8Logo from "../../../Assets/login-logo.png";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // close modal handler
  const handleClose = () => navigate("/");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your email.");
    } catch (err) {
      console.error("Reset error:", err);
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else {
        setError("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="forgot-container signup-container">
      <div className="modal-backdrop" id="login-main">
        {/* Close button */}
        <button
          className="close-btn"
          id="partner-close-btn"
          style={{ color: "white" }}
          onClick={handleClose}
        >
          ✕
        </button>

        <div
          className="modal-content fp-modal-content fade-in login-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo */}
          <img src={coreal8Logo} alt="Coreal8 Logo" className="login-logo" />

          {/* Intro text */}
          <div className="fp-modal-intro-text">
            <h2>Forgot Password?</h2>
            <p>No worries, we’ll send you reset instructions.</p>
          </div>
          <form onSubmit={handleReset} id="email-login">
            <label htmlFor="email" className="fp-email-label">
              Email Address
            </label>
            <input
              id="email fp-email"
              type="email"
              placeholder="e.g davidsamuels@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="email-submit-button">
              Continue
            </button>
          </form>
          {message && (
            <p style={{ color: "green", fontSize: "12px" }}>{message}</p>
          )}
          {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}

          <Link to="/login" className="fp-register-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3.5 7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H3.5C3.36739 8.5 3.24021 8.44732 3.14645 8.35355C3.05268 8.25979 3 8.13261 3 8C3 7.86739 3.05268 7.74021 3.14645 7.64645C3.24021 7.55268 3.36739 7.5 3.5 7.5Z"
                fill="#0D0C12"
              />
              <path
                d="M3.70789 8.00063L7.85489 12.1466C7.94878 12.2405 8.00152 12.3679 8.00152 12.5006C8.00152 12.6334 7.94878 12.7607 7.85489 12.8546C7.76101 12.9485 7.63367 13.0013 7.50089 13.0013C7.36812 13.0013 7.24078 12.9485 7.14689 12.8546L2.64689 8.35463C2.60033 8.30819 2.56339 8.25301 2.53818 8.19226C2.51297 8.13152 2.5 8.0664 2.5 8.00063C2.5 7.93486 2.51297 7.86974 2.53818 7.809C2.56339 7.74825 2.60033 7.69308 2.64689 7.64663L7.14689 3.14663C7.24078 3.05274 7.36812 3 7.50089 3C7.63367 3 7.76101 3.05274 7.85489 3.14663C7.94878 3.24052 8.00152 3.36786 8.00152 3.50063C8.00152 3.63341 7.94878 3.76075 7.85489 3.85463L3.70789 8.00063Z"
                fill="#0D0C12"
              />
            </svg>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

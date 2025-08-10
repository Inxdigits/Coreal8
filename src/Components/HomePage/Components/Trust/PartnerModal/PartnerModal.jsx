import React, { useEffect, useState } from "react";
import "./PartnerModal.css";

const PartnerModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Form Data:", data); // replace with actual logic
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <button className="close-btn" onClick={onClose}>
        X
      </button>
      <div className="modal-content fade-in">
        <div className="modal-intro-text">
          <h2>Partner with Coreal8</h2>
          <p>
            We’re excited about the possibility of working together! Please fill
            out the short form below to tell us more about you, your
            organization, and how you'd like to collaborate with Coreal8.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            name="fullName"
            placeholder="e.g John Doe"
            required
          />

          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            name="email"
            placeholder="e.g johndoe@gmail.com"
            required
          />

          <label htmlFor="company">Organization / Company Name</label>
          <input type="text" name="company" placeholder="e.g Power House" />

          <label htmlFor="role">Your Role / Title</label>
          <input type="text" name="role" placeholder="e.g C.E.O" />

          <select name="" id="">
            <option value="healthcare">Healthcare Provider or Clinic</option>
            <option value="hr">Healthcare Provider or Clinic</option>
            <option value="healthcare">Healthcare Provider or Clinic</option>
            <option value="healthcare">Healthcare Provider or Clinic</option>
            <option value="healthcare">Healthcare Provider or Clinic</option>
            <option value="healthcare">Healthcare Provider or Clinic</option>
            <option value="healthcare">Healthcare Provider or Clinic</option>
          </select>

          <label htmlFor="message">
            How would you like to partner with us?
          </label>
          <textarea
            name="message"
            placeholder="Tell us about your interest..."
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PartnerModal;

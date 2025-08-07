import React, { useEffect } from "react";
import "./PartnerModal.css";

const PartnerModal = ({ isOpen, onClose }) => {
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
      <div className="modal-content fade-in">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Become a Partner</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="text"
            name="company"
            placeholder="Organization"
            required
          />
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

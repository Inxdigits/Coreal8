import React from "react";

const WaitlistSuccess = ({ handleClose }) => {
  return (
    <div className="waitlist-success-overlay">
      <div className="waitlist-success-modal">
        <div className="icon">🚀</div>
        <h3>Thank you for joining the waitlist!</h3>
        <p>
          You’ll be the first to hear when our programs go live. In the
          meantime, follow us on Instagram and LinkedIn for updates.
        </p>
        <button className="waitlist-success-close-btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default WaitlistSuccess;

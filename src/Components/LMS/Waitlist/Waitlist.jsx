import React, { useState, useEffect, useCallback } from "react";
import emailjs from "emailjs-com";
import { useWaitlist } from "../../../context/WaitListcontext.jsx";
import logo from "../../../Assets/coreal8-logo.png";
import image from "../../../Assets/waitlist-image.png";
import "./Waitlist.css";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;
const AUTO_CLOSE_DELAY = 5000; // 5 seconds

const WaitlistModal = () => {
  const { isOpen, closeWaitlist } = useWaitlist();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ email: "", name: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, USER_ID);
      setForm({ email: "", name: "" });
      setSuccess(true);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = useCallback(() => {
    setSuccess(false);
    setForm({ email: "", name: "" });
    setError("");
    setLoading(false);
    closeWaitlist();
  }, [closeWaitlist]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(handleClose, AUTO_CLOSE_DELAY);
      return () => clearTimeout(timer);
    }
  }, [success, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="waitlist" role="dialog" aria-modal="true">
      {!success ? (
        <div className="waitlist-container">
          <button
            className="waitlist-close-btn"
            onClick={handleClose}
            aria-label="Close waitlist modal"
            disabled={loading}
          >
            ✕
          </button>
          <div className="waitlist-form">
            <div className="waitlist-form-content">
              <img src={logo} alt="Coreal8 logo" className="waitlist-logo" />

              <div className="waitlist-form-intro-text">
                <h2>
                  Get <span className="highlight">Early Access</span> to{" "}
                  <span className="highlight">Coreal8 Programs</span>
                </h2>
                <p>
                  We’re almost ready to launch a transformational platform for
                  courses, mentorship, coaching, and counseling.
                  <br />
                  Join our waitlist to be the first to know when enrollment
                  opens!
                </p>
              </div>

              <WaitlistForm
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                error={error}
                loading={loading}
              />
            </div>
          </div>
          <div className="waitlist-image">
            <img src={image} alt="Decorative illustration" />
          </div>
        </div>
      ) : (
        <SuccessMessage handleClose={handleClose} />
      )}
    </div>
  );
};

const WaitlistForm = ({ form, handleChange, handleSubmit, error, loading }) => (
  <form onSubmit={handleSubmit}>
    <div className="waitlist-inputs">
      <InputField
        id="waitlist-email"
        type="email"
        name="email"
        label="Email Address"
        placeholder="e.g johnDoe@email.com"
        value={form.email}
        onChange={handleChange}
        required
        disabled={loading}
      />
      <InputField
        id="waitlist-name"
        type="text"
        name="name"
        label="Full Name"
        placeholder="e.g John Doe"
        value={form.name}
        onChange={handleChange}
        required
        disabled={loading}
      />
    </div>
    <button type="submit" className="waitlist-submit-btn" disabled={loading}>
      {loading ? (
        <span className="loading-spinner-wrapper">
          <span className="loading-spinner" /> Sending...
        </span>
      ) : (
        "Join the Waitlist"
      )}
    </button>
    {error && <p className="waitlist-error">{error}</p>}
  </form>
);

const InputField = ({ id, label, ...props }) => (
  <div className="waitlist-input-field">
    <label htmlFor={id}>{label}</label>
    <input id={id} {...props} />
  </div>
);

const SuccessMessage = ({ handleClose }) => (
  <div className="waitlist-success-backdrop modal-backdrop">
    <div className="waitlist-success modal-content fade-in">
      <div className="icon" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="101"
          viewBox="0 0 100 101"
          fill="none"
        >
          <path
            d="M3.3332 59.4874C3.6057 59.8699 4.1057 60.0824 4.8057 60.1174C5.5057 60.1499 6.3882 60.0024 7.4057 59.6824C8.55763 59.3068 9.67305 58.8274 10.7382 58.2499C11.9207 57.6249 13.1307 56.8724 14.2982 56.0374C15.4342 55.223 16.5164 54.3361 17.5382 53.3824C18.5132 52.4649 19.3382 51.5499 19.9707 50.6899C20.6007 49.8299 21.0257 49.0399 21.2207 48.3674C21.4157 47.6974 21.3732 47.1549 21.1007 46.7724C20.8257 46.3899 20.3257 46.1774 19.6282 46.1424C18.9282 46.1099 18.0457 46.2574 17.0282 46.5774C16.0082 46.8999 14.8782 47.3849 13.6932 48.0099C12.5107 48.6349 11.3032 49.3874 10.1357 50.2224C8.99887 51.0367 7.91579 51.9236 6.8932 52.8774C6.00332 53.6994 5.18998 54.6007 4.4632 55.5699C3.8307 56.4299 3.4057 57.2199 3.2132 57.8924C3.0207 58.5649 3.0582 59.1074 3.3332 59.4874ZM1.7882 41.5699C2.3407 42.3399 3.4857 42.6399 4.9682 42.4024C6.4532 42.1649 8.1582 41.4099 9.7057 40.3024C11.2532 39.1949 12.5157 37.8274 13.2207 36.4974C13.9257 35.1699 14.0107 33.9899 13.4582 33.2199C12.9082 32.4474 11.7632 32.1474 10.2782 32.3874C8.7932 32.6274 7.0907 33.3799 5.5432 34.4874C3.9957 35.5949 2.7307 36.9624 2.0282 38.2924C1.3232 39.6174 1.2382 40.7999 1.7882 41.5699ZM6.3382 78.1699C6.6132 78.5499 7.1582 78.7299 7.9482 78.6999C8.7382 78.6699 9.7557 78.4249 10.9407 77.9824C12.2921 77.4653 13.6024 76.8468 14.8607 76.1324C16.3269 75.3092 17.7458 74.4044 19.1107 73.4224C20.5157 72.4174 21.8532 71.3474 23.0457 70.2724C24.2382 69.1974 25.2657 68.1399 26.0657 67.1599C26.8657 66.1799 27.4232 65.2949 27.7082 64.5599C27.9932 63.8199 27.9982 63.2449 27.7257 62.8624C27.4507 62.4799 26.9057 62.2999 26.1157 62.3324C25.3257 62.3649 24.3082 62.6074 23.1232 63.0474C21.7713 63.5661 20.4601 64.1853 19.2007 64.8999C17.8007 65.6824 16.3557 66.6024 14.9507 67.6074C13.5457 68.6124 12.2107 69.6824 11.0182 70.7574C9.8232 71.8324 8.7982 72.8899 7.9982 73.8724C7.1982 74.8524 6.6407 75.7374 6.3557 76.4724C6.0707 77.2074 6.0657 77.7874 6.3382 78.1699Z"
            fill="#FFE236"
            stroke="white"
            stroke-width="2.5"
            stroke-miterlimit="10"
          />
          <path
            d="M94.1219 44.0996C91.8969 42.3746 80.0469 41.0996 70.2219 41.0996C60.3969 41.0996 48.5219 42.3746 46.2969 44.0996C41.8469 45.8246 41.6719 54.6996 41.6719 61.3746C41.6719 68.0496 41.8469 79.1746 46.2969 80.8996C47.5719 81.8996 51.9969 82.7246 57.3969 83.3996L56.4219 90.1246C54.5219 90.5996 53.5719 91.1996 53.5719 93.0246C53.5719 94.8496 54.4219 95.5246 56.3469 95.8246C56.9969 95.8246 83.1469 95.9746 84.0719 95.8246C85.9219 95.4996 86.8469 94.7246 86.8469 93.0246C86.8469 91.3246 85.8969 90.5246 83.9969 90.1246L83.0219 83.3996C88.4219 82.8496 92.8469 82.0246 94.1219 80.8996C98.5719 79.1746 98.7469 68.0496 98.7469 61.3746C98.7469 54.6996 98.5719 45.8246 94.1219 44.0996Z"
            fill="#FFDB58"
            stroke="white"
            stroke-width="2.5"
            stroke-miterlimit="10"
          />
          <path
            d="M88.1469 74.6746C91.4719 73.4496 91.6219 67.1746 91.6219 62.4996C91.6219 57.8246 91.4719 51.5496 88.1469 50.3496C86.4719 49.1246 77.5719 48.2246 70.2219 48.2246C62.8719 48.2246 53.9469 49.1246 52.2719 50.3496C48.9469 51.5496 48.7969 57.8496 48.7969 62.4996C48.7969 67.1496 48.9469 73.4496 52.2719 74.6746C53.9469 75.8746 62.8469 76.7746 70.2219 76.7746C77.5969 76.7746 86.4719 75.8746 88.1469 74.6746Z"
            fill="white"
            stroke="white"
            stroke-width="2.5"
            stroke-miterlimit="10"
          />
          <path
            d="M62.3477 89.25C64.9408 88.7485 67.5842 88.5555 70.2227 88.675C72.8527 88.555 75.4877 88.75 78.0727 89.25"
            stroke="white"
            stroke-width="2.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M89 46.25C93 47.55 93.5 48.225 94.75 53"
            stroke="white"
            stroke-width="2.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M69.1746 5.49952C66.6746 5.79952 54.9746 8.14952 45.4246 10.4995C42.4996 11.1995 25.8996 15.4995 20.2246 19.8245C16.2746 22.8495 17.9246 25.3495 20.8496 27.5995L32.4996 36.4745C31.4996 45.4495 31.5746 51.0745 34.6746 52.6245C37.7746 54.1745 41.9245 50.6245 45.7495 46.6495L50.5746 50.3495C53.4995 52.5745 56.6745 53.8495 60.5746 50.8995C60.7995 50.7245 65.9496 47.9495 72.7746 31.5495C75.4195 25.2449 77.7474 18.8118 79.7495 12.2745C80.9995 6.04952 77.1746 4.49952 69.1746 5.49952Z"
            fill="#801323"
            stroke="white"
            stroke-width="2.5"
            stroke-miterlimit="10"
          />
          <path
            d="M41.6719 32C48.8418 26.5218 56.3574 21.5114 64.1719 17L41.6719 32Z"
            fill="#FFDB58"
          />
          <path
            d="M41.6719 32C48.8418 26.5218 56.3574 21.5114 64.1719 17"
            stroke="white"
            stroke-width="2.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M45.6227 46.6494C43.4977 44.8494 42.8477 44.1494 42.8477 44.1494L45.6227 46.6494Z"
            fill="#FFDB58"
          />
          <path
            d="M45.6227 46.6494C43.4977 44.8494 42.8477 44.1494 42.8477 44.1494"
            stroke="white"
            stroke-width="2.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M29.5742 21.4998C32.6496 19.8182 35.9257 18.5329 39.3242 17.6748"
            stroke="white"
            stroke-width="2.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div className="success-intro-text">
        <h3>Thank you for joining the waitlist!</h3>
        <p>
          You'll be the first to hear when our programs go live. 
          <br />
          In the
          meantime, follow us on Instagram and LinkedIn for early updates.
        </p>
      </div>
      <button className="success-submit-btn" onClick={handleClose}>
        Homepage
      </button>
    </div>
  </div>
);

export default WaitlistModal;

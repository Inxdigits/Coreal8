import React from "react";
import "./Footer.css";
import yt from "../../Assets/yt-logo.svg";
import ig from "../../Assets/ig-logo.svg";
import x from "../../Assets/x-logo.svg";
import li from "../../Assets/linkedin-logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const socials = [
    { icon: yt, alt: "YouTube", link: "https://youtube.com/@MakambaUC" },
    { icon: ig, alt: "Instagram", link: "https://instagram.com/coreal8.ng" },
    // { icon: x, alt: "X (Twitter)", link: "https://x.com" },
    { icon: li, alt: "LinkedIn", link: "https://linkedin.com/company/coreal8-limited" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook this to EmailJS or backend API
    alert("Thanks for subscribing! 🚀");
  };

  return (
    <footer>
      {/* Newsletter Section */}
      <div className="newsletter">
        <div className="newsletter-text">
          <h1>Join the Coreal8 Community</h1>
          <span>
            Get exclusive leadership content, early access to new courses, and podcast updates.
          </span>
        </div>
        <form className="footer-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Footer Menu */}
      <div className="footer-menu">
        <div className="top">
          <nav aria-label="Footer Navigation">
            <ul className="footer-nav">
              <li>
                <Link to="/about" className="footer-nav-link">About</Link>
              </li>
              <li>
                <Link to="/podcast" className="footer-nav-link">Podcast</Link>
              </li>
              <li>
                <Link to="/courses" className="footer-nav-link">Courses</Link>
              </li>
              <li>
                <Link to="/blog" className="footer-nav-link">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-nav-link">Contact</Link>
              </li>
              <li>
                <Link to="/login" className="footer-nav-link">Login</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="footer-nav-link">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="footer-nav-link">Terms of Service</Link>
              </li>
            </ul>
          </nav>

          {/* Socials */}
          <div className="socials">
            {socials.map(({ icon, alt, link }) => (
              <a
                key={alt}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <img src={icon} alt={alt} />
              </a>
            ))}
          </div>
        </div>

        <div className="bottom">
          <span>© {new Date().getFullYear()} Coreal8. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

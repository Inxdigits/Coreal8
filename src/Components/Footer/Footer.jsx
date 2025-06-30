import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="newsletter">
        <div className="newsletter-text">
          <h1>Join the Coreal8 Circle</h1>
          <span>
            Get exclusive leadership content, early access to new courses, and
            podcast updates.
          </span>
        </div>
        <form action="">
          <input type="email" name="" id="" placeholder="Email Address" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className="menu">
        <div className="top">
          <ul className="footer-nav">
            <li className="nav-link">About</li>
            <li className="nav-link">Podcast</li>
            <li className="nav-link">Courses</li>
            <li className="nav-link">Blog</li>
            <li className="nav-link">Contact</li>
            <li className="nav-link">Login</li>
            <li className="nav-link">Privacy Policy</li>
            <li className="nav-link">Terms of Service</li>
          </ul>
          <div className="socials">
            <button>YT</button>
            <button>IG</button>
            <button>X</button>
            <button>LI</button>
          </div>
        </div>
        <div className="bottom">
          <span>© 2025 Coreal8. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer

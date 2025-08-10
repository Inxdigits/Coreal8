import React from 'react';
import './Footer.css';
import yt from '../../Assets/yt-logo.svg';
import ig from '../../Assets/ig-logo.svg';
import x from '../../Assets/x-logo.svg';
import li from "../../Assets/linkedin-logo.svg";
import { Link, Links } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="newsletter">
        <div className="newsletter-text">
          <h1>Join the Coreal8 Circle</h1>
          <span>
            Get exclusive leadership content, early access to new courses,{" "}
            <br /> and podcast updates.
          </span>
        </div>
        <form action="" className="footer-form">
          <input type="email" name="" id="" placeholder="Email Address" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className="footer-menu">
        <div className="top">
          <ul className="footer-nav">
            <li className="nav-link">About</li>
            <li className="nav-link">Podcast</li>
            <li className="nav-link">Courses</li>
            <li className="nav-link">Blog</li>
            <li className="nav-link">Contact</li>
            <li className="nav-link">Login</li>
            <li className="nav-link"><Link to="/privacy">Privacy Policy</Link></li>
            <li className="nav-link">Terms of Service</li>
          </ul>
          <div className="socials">
            <button>
              <img src={yt} alt="" />
            </button>
            <button>
              <img src={ig} alt="" />
            </button>
            <button>
              <img src={x} alt="" />
            </button>
            <button>
              <img src={li} alt="" />
            </button>
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

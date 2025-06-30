import React from 'react';
import "./Navbar.css";
import { FaAngleDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <h1>Coreal8</h1>
      </div>
      <div className="nav-links">
        <ul>
          <li className="nav-link">About</li>
          <li className="nav-link dropdown">
            Counseling <FaAngleDown />
          </li>
          <li className="nav-link">Podcast</li>
          <li className="nav-link">Courses</li>
          <li className="nav-link">Blog</li>
          <li className="nav-link dropdown">
            Mentorship <FaAngleDown />
          </li>
          <li className="nav-link">Contact</li>
          <li className="nav-link">Login</li>
        </ul>
      </div>
      <div className="nav-btn">
        <button className="dark-bg-btn gtstd-btn dropdown">
          Get Started
          <FaAngleDown />
        </button>
      </div>
    </nav>
  );
}

export default Navbar

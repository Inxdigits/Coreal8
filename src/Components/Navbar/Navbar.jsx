import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../Assets/coreal8-logo.png";
import menuIcon from "../../Assets/menu-icon.svg";
import cartIcon from "../../Assets/carticon.svg";
import profileIcon from "../../Assets/profileicon.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { FaAngleDown } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
  }, [currentPath]);

  return (
    <nav
      className="
      navbar 
      navbar-expand-lg 
      border-bottom 
      px-80 py-3 
      fixed-top 
      "
    >
      <div className="container-fluid">
        <Link
          to="/"
          className={`logo navbar-brand position-relative ${
            currentPath === "/" ? "active-link" : ""
          }`}
        >
          <img src={logo} alt="Logo" style={{ maxWidth: "123px" }} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <img src={menuIcon} alt="menu toggle" style={{ width: "28px" }} />
        </button>

        <div
          className={`navbar-collapse ${isMenuOpen ? "block" : "hidden"}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
            {[
              { path: "/about", label: "About" },
              { path: "/courses", label: "Courses" },
              { path: "/podcast", label: "Podcast" },
              { path: "/blog", label: "Blog" },
              { path: "/contact", label: "Contact" },
            ].map(({ path, label }) => (
              <li
                key={path}
                className={`nav-item ${
                  currentPath === path ? "active-link" : ""
                }`}
              >
                <Link className="nav-link" to={path}>
                  {label}
                </Link>
              </li>
            ))}

            {/* Services Dropdown */}
            <li className="nav-item dropdown position-relative">
              <Link to='/services' className="nav-link dropdown-link dropdown-label">
                Services <FaAngleDown className="rotate-icon" /> {" "}
              </Link>
              <div className="dropdown-menu custom-dropdown">
                <Link className="dropdown-item" to="/services/counseling">
                  Counseling & Engagement
                </Link>
                <Link
                  className="dropdown-item"
                  to="/services/corporate-consulting"
                >
                  Corporate Consulting & Training
                </Link>
                <Link
                  className="dropdown-item"
                  to="/services/personal-branding"
                >
                  Personal Brand Development
                </Link>
              </div>
            </li>

            {/* Counseling Dropdown */}
            <li className="nav-item dropdown position-relative">
              <Link to='/counseling' className="nav-link dropdown-link dropdown-label">
                Counseling <FaAngleDown className="rotate-icon" /> {" "}
              </Link>
              <div className="dropdown-menu custom-dropdown">
                <Link className="dropdown-item" to="/counseling/individual">
                  Individual Counseling
                </Link>
                <Link className="dropdown-item" to="/counseling/relationship">
                  Couples/Relationship Counseling
                </Link>
                <Link className="dropdown-item" to="/counseling/family">
                  Family Counseling
                </Link>
                <Link className="dropdown-item" to="/counseling/group">
                  Group Counseling
                </Link>
              </div>
            </li>

            {/* Mentorship Dropdown */}
            <li className="nav-item dropdown position-relative">
              <Link to='/mentoring' className="nav-link dropdown-link dropdown-label">
                Mentorship <FaAngleDown className="rotate-icon" /> {" "}
              </Link>
              <div className="dropdown-menu custom-dropdown">
                <Link className="dropdown-item" to="/mentorship/mentoring">
                  Mentorship
                </Link>
                <Link className="dropdown-item" to="/mentorship/coaching">
                  Coaching
                </Link>
              </div>
            </li>

            {/* Icons */}
            <li className="nav-item">
              <img src={cartIcon} alt="Cart" className="nav-icon" />
            </li>

            <li className="nav-item">
              <img src={profileIcon} alt="Login" className="nav-icon" />
            </li>

            {/* Book Button */}
            <li className="nav-item gradient-button-container">
              <button className="btn btn-outline-dark px-4 py-2 gradient-button">
                Book a Session
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

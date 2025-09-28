import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/coreal8-logo.png";
import menuIcon from "../../Assets/menu-icon.svg";
import cartIcon from "../../Assets/carticon.svg";
import profileIcon from "../../Assets/profileicon.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { FaAngleDown } from "react-icons/fa";

import { useWaitlist } from "../../context/WaitListcontext.jsx";

const Navbar = () => {
  const { openWaitlist } = useWaitlist();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const handleNavigate = () => navigate("/booking");

  // mobile toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    setIsMenuOpen(false); // close menu on route change
  }, [currentPath]);

  // dropdown states (independent)
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCounselingOpen, setIsCounselingOpen] = useState(false);
  const [isMentorshipOpen, setIsMentorshipOpen] = useState(false);

  // toggle handlers
  const toggleServices = () => {
    setIsServicesOpen((prev) => !prev);
    setIsCounselingOpen(false);
    setIsMentorshipOpen(false);
  };

  const toggleCounseling = (e) => {
    e.preventDefault();
    setIsCounselingOpen((prev) => !prev);
    setIsMentorshipOpen(false);
  };

  const toggleMentorship = (e) => {
    e.preventDefault();
    setIsMentorshipOpen((prev) => !prev);
    setIsCounselingOpen(false);
  };

  // close menus if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".nav-item.dropdown")) {
        setIsServicesOpen(false);
        setIsCounselingOpen(false);
        setIsMentorshipOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg border-bottom fixed-top">
      <div className="container-fluid">
        {/* Logo */}
        <Link
          to="/"
          className={`logo navbar-brand position-relative ${
            currentPath === "/" ? "active-link" : ""
          }`}
        >
          <img src={logo} alt="Logo" style={{ maxWidth: "123px" }} />
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? (
            <span style={{ fontSize: "40px", fontWeight: "600" }}>&times;</span>
          ) : (
            <img src={menuIcon} alt="menu toggle" style={{ width: "28px" }} />
          )}
        </button>

        {/* Nav links */}
        <div
          className="navbar-collapse"
          id="navbarNav"
        >
          <ul className={`navbar-nav align-items-lg-center ${isMenuOpen ? "open" : ""}`}>
            {/* First half of nav links */}
            {[
              { path: "/about", label: "About" },
              { path: "/courses", label: "Courses" },
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
            <li
              className={`nav-item dropdown position-relative ${
                currentPath.startsWith("/services") ? "active-link" : ""
              }`}
            >
              <Link
                onClick={toggleServices}
                className="nav-link dropdown-link dropdown-label"
              >
                Services{" "}
                <FaAngleDown
                  className={`${isServicesOpen ? "rotate-icon" : ""}`}
                />
              </Link>

              <div
                className={`dropdown-menu ${
                  isServicesOpen ? "custom-dropdown" : "hidden"
                }`}
              >
                <Link className="dropdown-item" to="/services">
                  Counseling & Engagement
                </Link>
                <Link className="dropdown-item" to="/services">
                  Corporate Consulting & Training
                </Link>
                <Link className="dropdown-item" to="/services">
                  Personal Brand Development
                </Link>

                {/* Counseling Submenu */}
                <div className="dropdown-submenu">
                  <Link
                    onClick={toggleCounseling}
                    className="dropdown-item submenu-toggle"
                  >
                    Counseling{" "}
                    <FaAngleDown
                      className={`submenu-icon ${
                        isCounselingOpen ? "rotate-icon" : ""
                      }`}
                    />
                  </Link>
                  <div
                    className={`dropdown-menu right-submenu ${
                      isCounselingOpen ? "show" : ""
                    }`}
                  >
                    <Link className="dropdown-item" to="/counselling">
                      Individual Counselling
                    </Link>
                    <Link className="dropdown-item" to="/counselling">
                      Grief & Loss Counselling
                    </Link>
                    <Link className="dropdown-item" to="/counselling">
                      Stress & Anxiety Management
                    </Link>
                    <Link className="dropdown-item" to="/counselling">
                      Trauma-Informed Counselling
                    </Link>
                  </div>
                </div>

                {/* Mentorship Submenu */}
                <div className="dropdown-submenu">
                  <Link
                    onClick={toggleMentorship}
                    className="dropdown-item submenu-toggle"
                  >
                    Mentorship{" "}
                    <FaAngleDown
                      className={`submenu-icon ${
                        isMentorshipOpen ? "rotate-icon" : ""
                      }`}
                    />
                  </Link>
                  <div
                    className={`dropdown-menu right-submenu ${
                      isMentorshipOpen ? "show" : ""
                    }`}
                  >
                    <Link className="dropdown-item" to="/mentoring">
                      Mentorship
                    </Link>
                    <Link className="dropdown-item" to="/mentoring">
                      Coaching
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            {/* Second half of nav links */}
            {[
              { path: "/podcasts", label: "Podcasts" },
              { path: "/blogs", label: "Blogs" },
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

            {/* Cart */}
            <li
              className={`nav-item ${
                currentPath === "/cart" ? "active-link" : ""
              }`}
            >
              <Link className="nav-link" to="/cart">
                <img src={cartIcon} alt="Cart" className="nav-icon" />
              </Link>
            </li>

            {/* Profile */}
            <li
              className={`nav-item ${
                currentPath === "/login" ? "active-link" : ""
              }`}
            >
              <Link className="nav-link" onClick={openWaitlist}>
                <img src={profileIcon} alt="Login" className="nav-icon" />
              </Link>
            </li>

            {/* Book Button */}
            <li className="gradient-button-container">
              <button onClick={handleNavigate} className="gradient-button">
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

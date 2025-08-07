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
  
  const [dropdowns, setDropdowns] = useState({
    services: false,
    counseling: false,
    mentorship: false,
  });

  // Toggle specific dropdown and close others
  const toggleDropdown = (type) => {
    setDropdowns((prev) => {
      const newState = {
        services: false,
        counseling: false,
        mentorship: false,
      };
      newState[type] = !prev[type]; // Toggle only the selected
      return newState;
    });
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".nav-item.dropdown")) {
        setDropdowns({
          services: false,
          counseling: false,
          mentorship: false,
        });
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);



  return (
    <nav
      className="
      navbar 
      navbar-expand-lg 
      border-bottom 
      // px-80 py-3 
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
          {isMenuOpen ? (
            <span style={{ fontSize: "40px", fontWeight: "600" }}>
              &times;
            </span>
          ) : (
            <img src={menuIcon} alt="menu toggle" style={{ width: "28px" }} />
          )}
        </button>

        <div
          className={`navbar-collapse ${isMenuOpen ? "block" : "hidden"}`}
          id="navbarNav"
        >
          <ul
            className="navbar-nav 
            align-items-lg-center 
            "
          >
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
            <li
              className={`nav-item dropdown position-relative ${
                currentPath === "/services" ? "active-link" : ""
              }`}
            >
              <Link
                onClick={() => toggleDropdown("services")}
                className="nav-link dropdown-link dropdown-label"
              >
                Services{" "}
                <FaAngleDown
                  className={`${dropdowns.services ? "rotate-icon" : ""}`}
                />
              </Link>
              <div
                className={`dropdown-menu ${
                  dropdowns.services ? "custom-dropdown" : "hidden"
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
              </div>
            </li>

            {/* <li
              className={`nav-item dropdown position-relative ${
                currentPath === "/services" ? "active-link" : ""
              }`}
            >
              <Link
                // to="/services"
                onClick={toggleDropdown}
                className="nav-link dropdown-link dropdown-label"
              >
                Services <FaAngleDown className={`${isDropdown ? "rotate-icon" : ""}`} />{" "}
              </Link>
              <div
                // className="dropdown-menu custom-dropdown"
                className={`dropdown-menu ${
                  isDropdown ? "custom-dropdown" : "hidden"
                }`}
              >
                <Link className="dropdown-item" to="/services">
                  Counseling & Engagement
                </Link>
                <Link
                  className="dropdown-item"
                  to="/services"
                >
                  Corporate Consulting & Training
                </Link>
                <Link
                  className="dropdown-item"
                  to="/services"
                >
                  Personal Brand Development
                </Link>
              </div>
            </li> */}

            {/* Counseling Dropdown */}
            <li
              className={`nav-item dropdown position-relative ${
                currentPath === "/counseling" ? "active-link" : ""
              }`}
            >
              <Link
                onClick={() => toggleDropdown("counseling")}
                className="nav-link dropdown-link dropdown-label"
              >
                Counseling{" "}
                <FaAngleDown
                  className={`${dropdowns.counseling ? "rotate-icon" : ""}`}
                />
              </Link>
              <div
                className={`dropdown-menu ${
                  dropdowns.counseling ? "custom-dropdown" : "hidden"
                }`}
              >
                <Link className="dropdown-item" to="/counseling">
                  Individual Counseling
                </Link>
                <Link className="dropdown-item" to="/counseling">
                  Couples/Relationship Counseling
                </Link>
                <Link className="dropdown-item" to="/counseling">
                  Family Counseling
                </Link>
                <Link className="dropdown-item" to="/counseling">
                  Group Counseling
                </Link>
              </div>
            </li>

            {/* <li
              className={`nav-item dropdown position-relative ${
                currentPath === "/counseling" ? "active-link" : ""
              }`}
            >
              <Link
                // to="/counseling"
                onClick={toggleDropdown}
                className="nav-link dropdown-link dropdown-label"
              >
                Counseling <FaAngleDown className={`${isDropdown ? "rotate-icon" : ""}`} />{" "}
              </Link>
              <div
                // className="dropdown-menu custom-dropdown"
                className={`dropdown-menu ${
                  isDropdown ? "custom-dropdown" : "hidden"
                }`}
              >
                <Link className="dropdown-item" to="/counseling">
                  Individual Counseling
                </Link>
                <Link className="dropdown-item" to="/counseling">
                  Couples/Relationship Counseling
                </Link>
                <Link className="dropdown-item" to="/counseling">
                  Family Counseling
                </Link>
                <Link className="dropdown-item" to="/counseling">
                  Group Counseling
                </Link>
              </div>
            </li> */}

            {/* Mentorship Dropdown */}
            <li
              className={`nav-item dropdown position-relative ${
                currentPath === "/mentoring" ? "active-link" : ""
              }`}
            >
              <Link
                onClick={() => toggleDropdown("mentorship")}
                className="nav-link dropdown-link dropdown-label"
              >
                Mentorship{" "}
                <FaAngleDown
                  className={`${dropdowns.mentorship ? "rotate-icon" : ""}`}
                />
              </Link>
              <div
                className={`dropdown-menu ${
                  dropdowns.mentorship ? "custom-dropdown" : "hidden"
                }`}
              >
                <Link className="dropdown-item" to="/mentoring">
                  Mentorship
                </Link>
                <Link className="dropdown-item" to="/mentoring">
                  Coaching
                </Link>
              </div>
            </li>

            {/* <li
              className={`nav-item dropdown position-relative ${
                currentPath === "/mentoring" ? "active-link" : ""
              }`}
            >
              <Link
                // to="/mentoring"
                onClick={toggleDropdown}
                className="nav-link dropdown-link dropdown-label"
              >
                Mentorship <FaAngleDown className={`${isDropdown ? "rotate-icon" : ""}`} />{" "}
              </Link>
              <div
                // className="dropdown-menu custom-dropdown"
                className={`dropdown-menu ${
                  isDropdown ? "custom-dropdown" : "hidden"
                }`}
              >
                <Link className="dropdown-item" to="/mentoring">
                  Mentorship
                </Link>
                <Link className="dropdown-item" to="/mentoring">
                  Coaching
                </Link>
              </div>
            </li> */}

            {/* Icons */}
            <li
              className={`nav-item ${
                currentPath === "/cart" ? "active-link" : ""
              }`}
            >
              <Link className="nav-link" to="/cart">
                <img src={cartIcon} alt="Cart" className="nav-icon" />
              </Link>
            </li>

            <li className="nav-item">
              <img src={profileIcon} alt="Login" className="nav-icon" />
            </li>

            {/* Book Button */}
            <li className="nav-item gradient-button-container">
              <button className="nav-gradient-button gradient-button">
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
// btn btn-outline-dark px-4 py-2
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useDropdown } from "../../hooks/useDropdown";
import './Dropdown.css';
import NavDropdown from "./NavDropdown";
import logo from "../../Assets/coreal8-logo.png";
import GetStartedbtn from "../Get-Started-btn/Get-Started-btn.jsx";
import menuIcon from "../../Assets/menu-icon.svg";
import cartIcon from "../../Assets/carticon.svg";
import profileIcon from "../../Assets/profileicon.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const servicesDropdown = useDropdown();
  const counselingDropdown = useDropdown();
  const mentorshipDropdown = useDropdown();

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav>
      <Link
        to="/"
        className={`logo ${currentPath === "/" ? "active-link" : ""}`}
      >
        <img src={logo} alt="logo" />
      </Link>

      <ul className={isMenuOpen ? "active" : "inactive"}>
        <li
          className={`nav-link ${
            currentPath === "/about" ? "active-link" : ""
          }`}
        >
          <Link to="/about">About</Link>
        </li>

        <li
          className={`nav-link nav-services dropdown-menu ${
            currentPath === "/services" ? "active-link" : ""
          }`}
        >
          <Link to="/services">
            <NavDropdown
              label="Services"
              isOpen={servicesDropdown.isOpen}
              toggle={servicesDropdown.toggle}
              refProp={servicesDropdown.ref}
            >
              <div className="nav-services-dropdown navdropdown">
                <div className="nav-services-options navoptions">
                  <h3>Counseling & Engagement</h3>
                </div>
                <div className="nav-services-options navoptions">
                  <h3>Corporate Consulting & Training</h3>
                </div>
                <div className="nav-services-options navoptions">
                  <h3>Personal Brand Development</h3>
                </div>
              </div>
            </NavDropdown>
          </Link>
        </li>

        <li
          className={`nav-link dropdown-menu counsel ${
            currentPath === "/counseling" ? "active-link" : ""
          }`}
        >
          <Link to="/counseling">
            <NavDropdown
              label="Counseling"
              isOpen={counselingDropdown.isOpen}
              toggle={counselingDropdown.toggle}
              refProp={counselingDropdown.ref}
            >
              <div className="counseling-dropdown navdropdown">
                <div className="counseling-options navoptions">
                  <h3>Individual Counseling</h3>
                </div>
                <div className="counseling-options navoptions">
                  <h3>Couples/Relationship Counseling</h3>
                </div>
                <div className="counseling-options navoptions">
                  <h3>Family Counseling</h3>
                </div>
                <div className="counseling-options navoptions">
                  <h3>Group Counseling</h3>
                </div>
              </div>
            </NavDropdown>
          </Link>
        </li>
        <li
          className={`nav-link ${
            currentPath === "/courses" ? "active-link" : ""
          }`}
        >
          <Link to="/courses">Courses</Link>
        </li>
        <li
          className={`nav-link ${
            currentPath === "/podcasts" ? "active-link" : ""
          }`}
        >
          <Link to="/podcasts">Podcasts</Link>
        </li>
        <li
          className={`nav-link dropdown-menu mentor ${
            currentPath === "/mentorship" ? "active-link" : ""
          }`}
        >
          <Link to="/mentorship">
            <NavDropdown
              label="Mentorship"
              isOpen={mentorshipDropdown.isOpen}
              toggle={mentorshipDropdown.toggle}
              refProp={mentorshipDropdown.ref}
            >
              <div className="mentor-dropdown navdropdown">
                <div className="mentor-options navoptions">
                  <h3>Mentorship</h3>
                  {/* <span>Career, life, personal brand, etc</span> */}
                </div>
                {/* <div className="midline"></div> */}
                <div className="mentor-options navoptions">
                  <h3>Coaching</h3>
                  {/* <span>Career, life, personal brand, etc</span> */}
                </div>
              </div>
            </NavDropdown>
          </Link>
        </li>
    
        <li
          className={`nav-link ${currentPath === "/blog" ? "active-link" : ""}`}
        >
          Blog
        </li>

        <li
          className={`nav-link ${
            currentPath === "/contact" ? "active-link" : ""
          }`}
        >
          <Link to="/contact">Contact</Link>
        </li>
        <li
          className={`nav-link ${currentPath === "/cart" ? "active-link" : ""}`}
        >
          <Link to={"/cart"}>
            <img src={cartIcon} alt="Cart" />
          </Link>
        </li>
        <li
          className={`nav-link ${
            currentPath === "/login" ? "active-link" : ""
          }`}
        >
          <img src={profileIcon} alt="Login" />
        </li>

        <div className="navbtn">
          <li className="nav-link">
            <div className="hidden-button gradient-button-container">
              <button className="gradient-button">Book a Session</button>
            </div>
          </li>
        </div>
      </ul>

      <div className="menu">
        <div className="showing-button gradient-button-container">
          <button className="gradient-button">Book a Session</button>
        </div>
        <img src={menuIcon} onClick={toggleMenu} alt="menu toggle" />
      </div>
    </nav>
  );
};

export default Navbar;

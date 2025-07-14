import React from "react";
import { Link } from "react-router-dom";
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

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logo} alt="logo" />
      </Link>

      <ul className={isMenuOpen ? "active" : "inactive"}>
        <li className="nav-link">About</li>

        <li className="nav-link nav-services dropdown-menu">
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
        </li>

        <li className="nav-link dropdown-menu counsel">
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
        </li>
        <li className="nav-link">Courses</li>
        <li className="nav-link dropdown-menu mentor">
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
        </li>
        <li className="nav-link">Podcast</li>
        <li className="nav-link">Blog</li>

        <li className="nav-link">
          <Link to="/contact">Contact</Link>
        </li>
        <li className="nav-link">
          <img src={cartIcon} alt="Cart" />
        </li>
        <li className="nav-link">
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

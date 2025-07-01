import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../Assets/coreal8-logo.png";
import { FaAngleDown } from "react-icons/fa";
import GetStartedbtn from "../Get-Started-btn/Get-Started-btn.jsx";
import menuIcon from "../../Assets/menu-icon.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <ul className={isMenuOpen ? "active" : "inactive"}>
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

      <div className="menu" onClick={toggleMenu}>
        <GetStartedbtn />
        <img src={menuIcon} alt="menu toggle" />
      </div>
    </nav>
  );
};

export default Navbar;

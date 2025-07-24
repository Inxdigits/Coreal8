import React from "react";
import { FaAngleDown } from "react-icons/fa";
import "./Navbar.css";

const NavDropdown = ({ label, children, isOpen, refProp }) => {
  return (
    <li
      className="nav-link dropdown"
      ref={refProp}
    >
      <div className="dropdown-label">
        {label}
        <FaAngleDown className={`dropdown-icon ${isOpen ? "rotate" : ""}`} />
      </div>
      <div className="dropdown-content">
        {children}
      </div>
    </li>
  );
};

export default NavDropdown;

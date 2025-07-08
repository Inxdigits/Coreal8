import React from "react";
import { FaAngleDown } from "react-icons/fa";
import "./Navbar.css";

const NavDropdown = ({ label, children, isOpen, toggle, refProp }) => {
  return (
    <li className="nav-link dropdown" onClick={toggle} ref={refProp}>
      {label}
      <FaAngleDown className={`dropdown-icon ${isOpen ? "rotate" : ""}`} />
      {isOpen && <div className="dropdown-content">{children}</div>}
    </li>
  );
};

export default NavDropdown;

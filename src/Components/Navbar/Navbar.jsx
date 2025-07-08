import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useDropdown } from "../../hooks/useDropdown";
import NavDropdown from "./NavDropdown";
import logo from "../../Assets/coreal8-logo.png";
import GetStartedbtn from "../Get-Started-btn/Get-Started-btn.jsx";
import menuIcon from "../../Assets/menu-icon.svg";
import cartIcon from "../../Assets/carticon.svg";
import profileIcon from "../../Assets/profileicon.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const counselingDropdown = useDropdown();
  const mentorshipDropdown = useDropdown();

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <ul className={isMenuOpen ? "active" : "inactive"}>
        <li className="nav-link">About</li>

        <li className="nav-link counsel">
          <NavDropdown
            label="Counseling"
            isOpen={counselingDropdown.isOpen}
            toggle={counselingDropdown.toggle}
            refProp={counselingDropdown.ref}
          >
            <div className="counseling-dropdown">
              <div className="counseling-options">
                <h3>Individual Counseling</h3>
                <span>
                  Anxiety & depression, self-esteem issues, trauma or abuse,
                  stress management, grief and loss etc...
                </span>
              </div>
              <div className="counseling-options">
                <h3>Couples/Relationship Counseling</h3>
                <span>
                  Improve communication, Resolve conflicts, Heal from
                  infidelity, Strengthen emotional connection
                </span>
              </div>
              <div className="counseling-options">
                <h3>Family Counseling</h3>
                <span>
                  Parenting challenges, Sibling rivalry, Divorce or separation
                  impact, Blended family adjustments
                </span>
              </div>
              <div className="counseling-options">
                <h3>Group Counseling</h3>
                <span>
                  Addiction recovery, Grief support, Social skills development,
                  Coping with shared issues (e.g., chronic illness...
                </span>
              </div>
              <div className="counseling-options">
                <h3>Career Counseling</h3>
                <span>
                  Career choice or change, Workplace stress, Burnout, Work-life
                  balance...
                </span>
              </div>
              <div className="counseling-options">
                <h3>Trauma Counseling</h3>
                <span>
                  PTSD, Domestic violence, Childhood abuse, Accident or disaster
                  recovery...
                </span>
              </div>
              <div className="counseling-options">
                <h3>Addiction Counseling</h3>
                <span>
                  Substance abuse, Gambling addiction, Internet or phone
                  addiction, Recovery support...
                </span>
              </div>
              <div className="counseling-options">
                <h3>Crisis Counseling</h3>
                <span>
                  Loss of a loved one, Sudden job loss, Suicidal thoughts, Major
                  life transitions...
                </span>
              </div>
            </div>
          </NavDropdown>
        </li>
        <li className="nav-link">Podcast</li>
        <li className="nav-link">Courses</li>
        <li className="nav-link">Blog</li>
        <li className="nav-link mentor">
          <NavDropdown
            label="Mentorship"
            isOpen={mentorshipDropdown.isOpen}
            toggle={mentorshipDropdown.toggle}
            refProp={mentorshipDropdown.ref}
          >
            <div className="mentor-dropdown">
              <div className="mentor-options">
                <h3>Mentorship</h3>
                <span>Career, life, personal brand, etc</span>
              </div>
              <div className="midline"></div>
              <div className="mentor-options">
                <h3>Coaching</h3>
                <span>Career, life, personal brand, etc</span>
              </div>
            </div>
          </NavDropdown>
        </li>

        <li className="nav-link">
          <Link to="/contact">Contact</Link>
        </li>
        <li className="nav-link">
          <img src={cartIcon} alt="" />
        </li>
        <li className="nav-link">
          <img src={profileIcon} alt="" />
        </li>

        <div className="navbtn">
          <li className="nav-link hidden-button">
            <GetStartedbtn />
          </li>
        </div>
      </ul>

      <div className="menu">
        <div className="showing-button">
          <GetStartedbtn />
        </div>
        <img src={menuIcon} onClick={toggleMenu} alt="menu toggle" />
      </div>
    </nav>
  );
};

export default Navbar;

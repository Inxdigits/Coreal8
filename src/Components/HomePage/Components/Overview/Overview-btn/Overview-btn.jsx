import React, { useState, useEffect, useRef } from "react";
import "./Overview-btn.css";
import { FaAngleDown } from "react-icons/fa";
import schedule from "../../../../../Assets/schedule.svg";
import podcast from "../../../../../Assets/podcast.svg";
import book from "../../../../../Assets/book-outline.svg";
import { useWaitlist } from "../../../../../context/WaitListcontext";
import { useNavigate } from "react-router-dom";

const OverviewBtn = () => {
  const { openWaitlist } = useWaitlist();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleServiceNav = () => navigate("/services");
  const handleCourseNav = () => navigate("/courses");

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Overlay */}
      {isDropdownOpen && (
        <div
          className={`overlay-bg ${isDropdownOpen ? "show" : ""}`}
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      <div className="overview-show" ref={dropdownRef}>
        <button
          className="gtstd-btn dark-bg-btn overview-gtstd-btn"
          onClick={toggleDropdown}
        >
          Get Started
          <FaAngleDown
            className={`dropdown-icon ${isDropdownOpen ? "rotate" : ""}`}
          />
        </button>

        <div
          className={`overview-gtstd-menu ${
            isDropdownOpen ? "dropdown-show" : "dropdown-hide"
          }`}
        >
          <div
            onClick={openWaitlist}
            style={{ cursor: "pointer" }}
            className="gtstd-option"
          >
            <img src={schedule} alt="" />
            <span>Book a Session</span>
          </div>
          <div
            onClick={handleServiceNav}
            style={{ cursor: "pointer" }}
            className="gtstd-option"
          >
            <img src={book} alt="" />
            <span>Explore Services</span>
          </div>
          <div
            onClick={handleCourseNav}
            style={{ cursor: "pointer" }}
            className="gtstd-option"
          >
            <img src={podcast} alt="" />
            <span>Start a Course</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewBtn;

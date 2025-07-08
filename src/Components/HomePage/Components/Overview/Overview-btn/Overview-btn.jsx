import React, { useState, useEffect, useRef } from 'react';
import "./Overview-btn.css";
import { FaAngleDown } from 'react-icons/fa';
import schedule from "../../../../../Assets/schedule.svg";
import podcast from "../../../../../Assets/podcast.svg";
import book from "../../../../../Assets/book-outline.svg";
import arrowdown from "../../../../../Assets/arrowdown.svg";

const OverviewBtn = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
   
       <div className="showing-button overview-show" ref={dropdownRef}>
         <button className="gtstd-btn dark-bg-btn overview-gtstd-btn" onClick={toggleDropdown}>
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
           <div className="gtstd-option">
             <img src={schedule} alt="" />
             <span>Book Dr. Enobong</span>
           </div>
           <div className="gtstd-option">
             <img src={book} alt="" />
             <span>Start Learning</span>
           </div>
           <div className="gtstd-option">
             <img src={podcast} alt="" />
             <span>Listen to Podcast</span>
           </div>
         </div>
       </div>
  )
}

export default OverviewBtn

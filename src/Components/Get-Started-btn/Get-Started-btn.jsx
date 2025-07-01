import React from 'react';
import { FaAngleDown } from "react-icons/fa";
import './Get-Started-btn.css';

const GetStartedbtn = () => {
  return (
    <div className="nav-btn">
      <button className="dark-bg-btn gtstd-btn dropdown">
        Get Started
        <FaAngleDown />
      </button>
    </div>
  );
}

export default GetStartedbtn

import React from 'react';
import './Overview.css';
import GetStartedbtn from '../../../Get-Started-btn/Get-Started-btn.jsx';
import overviewImage from '../../../../Assets/overview-image.png';

const Overview = () => {
  return (
    <div className="overview">
      <div className="left-side">
        <div className="overview-writeup">
          <p>&gt;&gt; LEADERSHIP. LIFESTYLE. LEGACY</p>
          <h2>
            Helping You Lead Boldly, Live Fully, and Leave a Lasting Impact.
          </h2>
          <span>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus ad cumque fugit ea quidem blanditiis veritatis.
          </span>
        </div>
        <div className="overview-button">
          <GetStartedbtn />
        </div>
      </div>
      <div className="right-side">
        <img src={overviewImage} alt="" className="overview-image" />
      </div>
    </div>
  );
}

export default Overview

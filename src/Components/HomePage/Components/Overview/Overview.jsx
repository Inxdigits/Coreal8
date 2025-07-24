import React from 'react';
import './Overview.css';
import OverviewBtn from './Overview-btn/Overview-btn.jsx';
// import '../../../Get-Started-btn/Get-Started-btn.css';
import overviewImage from '../../../../Assets/overview-image.png';

const Overview = () => {
  return (
    <div className="overview">
      <div className="left-side">
        <div className="overview-writeup">
          <p >&gt;&gt; Transforming Minds. Amplifying Impact.</p>
          <h2>Unlock Your Full Potential.</h2>
          <span>
            From personal growth to corporate excellence, we provide tailored,
            counseling, strategic solutions, and expert training to empower
            individuals and organizations to thrive. Elevate your impact and
            amplify your voice.
          </span>
        </div>
        <div className="overview-button">
          <OverviewBtn />
        </div>
      </div>
      <div className="right-side">
        <img src={overviewImage} alt="" className="overview-image" />
      </div>
    </div>
  );
}

export default Overview

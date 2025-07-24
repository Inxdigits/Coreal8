import React from 'react';
import './AboutUs.css';
import DataCount from './DataCount/DataCount.jsx';


const AboutUs = () => {
  return (
    <div className='aboutus-container'>
        <h3>
          Rooted in Results. Driven by Purpose.
        </h3>
        <DataCount />
    </div>
  )
}

export default AboutUs

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './RouteTransition.css';

const RouteTransition = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Start exit animation
    setIsExiting(true);
    setIsVisible(false);

    // After exit animation, start enter animation
    const timer = setTimeout(() => {
      setIsExiting(false);
      setIsVisible(true);
    }, 150); // Half of the transition duration

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={`route-transition ${isExiting ? 'exiting' : ''} ${isVisible ? 'entering' : ''}`}>
      {children}
    </div>
  );
};

export default RouteTransition;

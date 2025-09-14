import React from 'react';
import './CoursesMain.css';
import { Link } from 'react-router-dom';
// import course1 from '../../HomePage/Assets/first-course.png';
// import openicon from '../../HomePage/Assets/open-icon.svg';
// import course2 from '../../HomePage/Assets/second-course.png';
// import course3 from '../../HomePage/Assets/third-course.png';
// import arrowdown from '../../../Assets/arrowdown.svg';
// import { SearchSection } from './SearchSection.jsx';
import { FeaturedCoursesSection } from './FeaturedCoursesSection';

const CoursesMain = () => {
  
  return (
    <div className="mc-container flex-column">
      {/* <SearchSection /> */}
      <FeaturedCoursesSection />
    </div>
  );
}

export default CoursesMain

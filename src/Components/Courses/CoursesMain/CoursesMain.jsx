import React from 'react';
import './CoursesMain.css';
import { Link } from 'react-router-dom';
// import course1 from '../../HomePage/Assets/first-course.png';
// import openicon from '../../HomePage/Assets/open-icon.svg';
// import course2 from '../../HomePage/Assets/second-course.png';
// import course3 from '../../HomePage/Assets/third-course.png';
// import arrowdown from '../../../Assets/arrowdown.svg';
import { SearchSection } from './SearchSection.jsx';
import { FeaturedCoursesSection } from './FeaturedCoursesSection';

const CoursesMain = () => {
  // const courses = [
  //   {
  //     img: course1,
  //     title: "The Visionary Leader's Blueprint",
  //     writeup: "Learn how to lead with clarity, courage, and conviction in today’s dynamic world."
  //   },
  //   {
  //     img: course2,
  //     title: "The Visionary Leader's Blueprint",
  //     writeup: "Learn how to lead with clarity, courage, and conviction in today’s dynamic world.",
  //   },
  //   {
  //     img: course3,
  //     title: "The Visionary Leader's Blueprint",
  //     writeup: "Learn how to lead with clarity, courage, and conviction in today’s dynamic world."
  //   },
  //   {
  //     img: course1,
  //     title: "The Visionary Leader's Blueprint",
  //     writeup:
  //       "Learn how to lead with clarity, courage, and conviction in today’s dynamic world.",
  //   },
  //   {
  //     img: course2,
  //     title: "The Visionary Leader's Blueprint",
  //     writeup:
  //       "Learn how to lead with clarity, courage, and conviction in today’s dynamic world.",
  //   },
  //   {
  //     img: course3,
  //     title: "The Visionary Leader's Blueprint",
  //     writeup:
  //       "Learn how to lead with clarity, courage, and conviction in today’s dynamic world.",
  //   }
  // ]
  
  // const CoursePreview = ({ img, title, writeup }) => {
  //   return (
  //     <div className="courses-preview">
  //       <div className="courses-preview-img">
  //         <img src={img} alt="" />
  //       </div>
  //       <div className="courses-preview-writeup">
  //         <p>{title}</p>
  //         <span>{writeup}</span>
  //       </div>
  //       <div className="courses-card-bottom">
  //         <span>₦45,000</span>
  //         <Link to="/contact" className="view-course-link">
  //           View course
  //           <img src={openicon} />
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // };
  
  return (
    <div className="mc-container flex-column">
      <SearchSection />
      <div className='mb'></div>
      <FeaturedCoursesSection />
      {/* <div className="mc-top">
        <div className="searchbar-container">
          <input
            size={50}
            type="search"
            name="Searchbar"
            id="search-bar"
            placeholder="Search Here"
          />
          <button>Search</button>
        </div>
        <div className="sorting-mechanism">
          <span>Filter by: </span>
          <select
            name="Filter"
            id="select-button"
            style={{ backgroundImage: `url(${arrowdown})` }}
          >
            <option value="All" selected>
              All
            </option>
            <option value="Latest">Latest to Oldest</option>
            <option value="Oldest">Oldest to Latest</option>
          </select>
        </div>
      </div>
      <div className="featured-courses">
        <p>Featured Courses</p>
        <div className="courses">
          {courses.map((course, index) => (
            <CoursePreview key={index} {...course} />
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default CoursesMain

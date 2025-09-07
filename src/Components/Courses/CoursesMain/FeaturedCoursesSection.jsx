import React from "react";
import openicon from '../../HomePage/Assets/open-icon.svg';

import { useWaitlist } from "../../../context/WaitListcontext.jsx";


import course1 from '../../HomePage/Assets/first-course.png';
import course2 from '../../HomePage/Assets/second-course.png';
import course3 from '../../HomePage/Assets/third-course.png';
import { Link } from "react-router-dom";

export const FeaturedCoursesSection = () => {
  const { openWaitlist } = useWaitlist();

  const coursesData = [
    {
      id: 1,
      title: "The Visionary Leader's Blueprint",
      description:
        "Learn how to lead with clarity, courage, and conviction in today's dynamic world.",
      price: "N45,000",
      icon: course1,
    },
    {
      id: 2,
      title: "The Visionary Leader's Blueprint",
      description:
        "Learn how to lead with clarity, courage, and conviction in today's dynamic world.",
      price: "N45,000",
      icon: course2,
    },
    {
      id: 3,
      title: "The Visionary Leader's Blueprint",
      description:
        "Learn how to lead with clarity, courage, and conviction in today's dynamic world.",
      price: "N45,000",
      icon: course3,
    },
    {
      id: 4,
      title: "The Visionary Leader's Blueprint",
      description:
        "Learn how to lead with clarity, courage, and conviction in today's dynamic world.",
      price: "N45,000",
      icon: course1,
    },
    {
      id: 5,
      title: "The Visionary Leader's Blueprint",
      description:
        "Learn how to lead with clarity, courage, and conviction in today's dynamic world.",
      price: "N45,000",
      icon: course2,
    },
    {
      id: 6,
      title: "The Visionary Leader's Blueprint",
      description:
        "Learn how to lead with clarity, courage, and conviction in today's dynamic world.",
      price: "N45,000",
      icon: course3,
    },
  ];

  const CourseCard = ({ course }) => (
    <article className="courses-card">
      <div className="">
        <img className="" alt="" src={course.icon} />
      </div>
      {/* <div
        className="courses-card-img"
        role="img"
        aria-label="Course thumbnail"
      /> */}

      <div className="courses-preview-writeup">
        <p className="">{course.title}</p>

        <span className="">{course.description}</span>
      </div>

      <div className="courses-card-bottom">
        <span className="course-price">{course.price}</span>

        <Link
          onClick={openWaitlist}
          className="view-course-link"
          aria-label={`View ${course.title} course`}
        >
          <span className="">View Course</span>
          <img src={openicon} />
        </Link>
      </div>
    </article>
  );

  return (
    <section className="featured-courses">
      <p className="">Featured Courses</p>

      <div className="courses-lineup">
        <div className="courseslist">
          {coursesData.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="courseslist">
          {coursesData.slice(3, 6).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

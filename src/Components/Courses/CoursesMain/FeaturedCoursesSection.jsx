import React, { useState } from "react";
import openicon from "../../HomePage/Assets/open-icon.svg";
import course1 from "../../HomePage/Assets/first-course.png";
import course2 from "../../HomePage/Assets/second-course.png";
import course3 from "../../HomePage/Assets/third-course.png";
import { Link } from "react-router-dom";
import { SearchSection } from "./SearchSection"; // Import the search/filter nav
import { useWaitlist } from "../../../context/WaitListcontext";

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
      category: "Leadership & Influence",
    },
    {
      id: 2,
      title: "Mastering Communication",
      description:
        "Unlock the secrets of persuasive and impactful communication.",
      price: "N35,000",
      icon: course2,
      category: "Communication",
    },
    {
      id: 3,
      title: "Personal Growth Accelerator",
      description:
        "Develop habits and skills to accelerate your personal and professional growth.",
      price: "N30,000",
      icon: course3,
      category: "Personal Growth",
    },
    {
      id: 4,
      title: "Building High-Performance Teams",
      description:
        "Learn proven strategies to create and manage effective teams.",
      price: "N50,000",
      icon: course1,
      category: "Team Building",
    },
    {
      id: 5,
      title: "Advanced Leadership Strategy",
      description: "Strategic insights to elevate your leadership style.",
      price: "N60,000",
      icon: course2,
      category: "Leadership & Influence",
    },
    {
      id: 6,
      title: "Effective Public Speaking",
      description: "Boost confidence and speak with authority in any setting.",
      price: "N40,000",
      icon: course3,
      category: "Communication",
    },
  ];

  const [searchValue, setSearchValue] = useState("");
  const [selectedSort, setSelectedSort] = useState("All"); // ✅ default to "All"

  // 🔍 Filtering logic
  const filteredCourses = coursesData.filter((course) => {
    const query = searchValue.toLowerCase();
    const matchesSearch =
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query);

    const matchesCategory =
      selectedSort === "All" || course.category === selectedSort;

    return matchesSearch && matchesCategory;
  });

  const CourseCard = ({ course }) => (
    <article className="courses-card">
      <div className="course-card-image">
        <img alt={course.title} src={course.icon} />
        <span className="category">{course.category}</span>
      </div>

      <div className="courses-preview-writeup">
        <p>{course.title}</p>
        <span>{course.description}</span>
      </div>

      <div className="courses-card-bottom">
        <span className="course-price">{course.price}</span>

          {/* to={`/courses/${course.id}`} */}
        <Link
          onClick={openWaitlist}
          className="view-course-link"
          aria-label={`View ${course.title} course`}
        >
          <span>View Course</span>
          <img src={openicon} alt="" />
        </Link>
      </div>
    </article>
  );

  return (
    <section className="featured-courses">
      <p>Featured Courses</p>

      {/* Search & Filter Nav */}
      <SearchSection
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />

      {/* Course lineup */}
      <div className="courses-lineup">
        {filteredCourses.length > 0 ? (
          <div className="courseslist">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="no-results">
            No courses found for <strong>“{searchValue}”</strong>
            {selectedSort !== "All" && (
              <>
                {" "}
                in <strong>{selectedSort}</strong>
              </>
            )}
            .
          </p>
        )}
      </div>
    </section>
  );
};

import React, { useState, useEffect, useMemo } from "react";
import openicon from "../../HomePage/Assets/open-icon.svg";
// import course1 from "../../../Assets/CoursesPageAssets/courses/strategic-leader.png";
// import course2 from "../../../Assets/CoursesPageAssets/courses/modern-people-management.jpg";
// import course3 from "../../../Assets/CoursesPageAssets/courses/culture-transformation.jpg";
// import course4 from "../../../Assets/CoursesPageAssets/courses/cx-mastery.jpg";
// import course5 from "../../../Assets/CoursesPageAssets/courses/sni-fundamentals.png";
// import course6 from "../../../Assets/CoursesPageAssets/courses/performance-management-reimagined.jpg";
// import course7 from "../../../Assets/CoursesPageAssets/courses/cpm.jpg";
import { Link } from "react-router-dom";
import { SearchSection } from "./SearchSection";
import { useWaitlist } from "../../../context/WaitListcontext";

export const FeaturedCoursesSection = () => {
  const { openWaitlist } = useWaitlist();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSort, setSelectedSort] = useState("All");

  // ✅ Keep the image map centralized
  // const imageMap = {
  //   1: course1,
  //   2: course2,
  //   3: course3,
  //   4: course4,
  //   5: course5,
  //   6: course6,
  //   7: course7
  // };

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}courses.json`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error loading courses:", err))
      .finally(() => setLoading(false));
  }, []);

  // 🔍 Filtering logic (wrapped in useMemo for optimization)
  const filteredCourses = useMemo(() => {
    const query = searchValue.toLowerCase();
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query);

      const matchesCategory =
        selectedSort === "All" || course.category === selectedSort;

      return matchesSearch && matchesCategory;
    });
  }, [courses, searchValue, selectedSort]);

  const CourseCard = ({ course }) => {
    const { id, image, title, writeup, price, category } = course;
    return (
      <article className="courses-card">
        <div className="courses-card-top">
          <div className="course-card-image">
            <img src={image} alt={title} />
            <span className="category">{category}</span>
          </div>

          <div className="courses-preview-writeup">
            <p>{title}</p>
            <span>{writeup}</span>
          </div>
        </div>

        <div className="courses-card-bottom">
          <span className="course-price">₦{price}</span>
          <Link
            onClick={openWaitlist}
            className="view-course-link"
            aria-label={`View ${title} course`}
          >
            View Course
            <img src={openicon} alt="open" />
          </Link>
        </div>
      </article>
    );
  };

  return (
    <section className="featured-courses">
      <p>Featured Courses</p>

      <SearchSection
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />

      <div className="courses-lineup">
        {loading ? (
          <p>Loading courses...</p>
        ) : filteredCourses.length > 0 ? (
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

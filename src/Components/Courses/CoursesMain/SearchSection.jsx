import React, { useState } from "react";
import SearchIcon from "../../../Assets/BlogPageAssets/search.svg";
import "./CoursesMain.css";

const sortOptions = [
  "All", // ✅ Added here
  "Strategy & Leadership",
  "People Management & Culture",
  "Customer-Centric Business",
  "Innovation & Growth",
  "Performance & Analytics"
];

export const SearchSection = ({
  searchValue,
  setSearchValue,
  selectedSort,
  setSelectedSort,
}) => {
  const [isDropDownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchValue);
  };

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setIsDropdownOpen(false);
  };

  return (
    <nav
      className="searchcontainer"
      role="navigation"
      aria-label="Content filters and sorting"
    >
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="searchform"
        role="search"
        aria-label="Search courses"
      >
        <div className="searchbar flex items-center border border-[#0d0c121a] rounded-2xl px-2">
          <img
            src={SearchIcon}
            alt=""
            aria-hidden="true"
            className="w-5 h-5 mr-2"
          />
          {/* <label htmlFor="search-input" className="sr-only">
            Search Courses
          </label> */}
          <input
            id="search-input"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Courses..."
            className="w-full text-base text-[#0d0c12] placeholder:text-[#0d0c12b3] bg-transparent border-none focus:outline-none"
          />
        </div>
        <button
          type="submit"
          aria-label="Submit search"
          className="dark-bg-btn"
        >
          Search
        </button>
      </form>

      {/* Sort Dropdown */}
      <div className="nav-filter">
        <label className="text-base text-[#0d0c12]">Filter by:</label>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="filter-select sort-filter-dropdown px-5 py-2.5 rounded-lg border bg-white hover:opacity-80 transition"
            aria-expanded={isDropDownOpen}
            aria-haspopup="listbox"
            type="button"
          >
            {selectedSort}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 transition-transform ${
                isDropDownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {isDropDownOpen && (
            <ul
              role="listbox"
              aria-label="Sort options"
              className="listbox absolute top-full right-0 mt-1 bg-white border border-[#0d0c121a] rounded-lg shadow-lg z-10 min-w-full"
            >
              {sortOptions.map((option) => (
                <li
                  key={option}
                  role="option"
                  aria-selected={selectedSort === option}
                  className={`filteroption transition-colors hover:bg-gray-50 ${
                    selectedSort === option
                      ? "text-[#801323] bg-gray-50"
                      : "text-[#0d0c12]"
                  }`}
                >
                  <button
                    onClick={() => handleSortSelect(option)}
                    className={`w-full px-5 py-2.5 text-left text-base`}
                    type="button"
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

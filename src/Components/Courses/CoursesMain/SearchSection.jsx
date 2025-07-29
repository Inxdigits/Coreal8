import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import arrowdown from '../../../Assets/arrowdown.svg';

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(
    "All"
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortOptions = [
    "All",
    "Oldest to Latest",
    "Latest to Oldest",
    // "Personal Development",
    // "Marketing & Sales",
  ];

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setIsDropdownOpen(false); // Close dropdown after selection
  }
  

  // const handleSearchChange = (e) => {
  //   setSearchValue(e.target.value);
  // } 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleFilterSelect = (option) => {
    setSelectedFilter(option);
    setIsFilterOpen(false);
  };

  return (
    <div className="mc-top">
      <form onSubmit={handleSearchSubmit} className="mc-form">
        <div className="searchbar-container">
          <div
            className="input-search-icon"
            role="img"
            aria-label="Search icon"
          >
            <CiSearch />
            {/* <div className="">
              <img
                className=""
                alt=""
                src={vector7}
              />
              <img
                className=""
                alt=""
                src={vector8}
              />
            </div> */}
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className=""
            aria-label="Search courses"
          />
        </div>
        <button
          type="submit"
          className="search-button"
          aria-label="Search courses"
        >
          Search
        </button>
      </form>
      <div className="sorting-mechanism">
        <label className="">Filter by:</label>

        <div className="filter-select">
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className=""
            aria-expanded={isFilterOpen}
            aria-haspopup="listbox"
            aria-label="Filter options"
          >
            <p className="">
              {selectedFilter}

              <img
                className={` ${isFilterOpen ? "rotate-180" : "rotate-90"}`}
                alt=""
                src={arrowdown}
              />
            </p>

            <div></div>
          </button>

          {isFilterOpen && (
            <div
            // className={isFilterOpen ? "" : "hidden"}
            >
              <ul role="listbox" className="filter-listbox">
                {filterOptions.map((option, index) => (
                  <li
                    key={index}
                    role="option"
                    aria-selected={option === selectedFilter}
                    className="filter-option-case"
                  >
                    <button
                      type="button"
                      onClick={() => handleFilterSelect(option)}
                      className={`filter-option ${
                        option === selectedFilter
                          ? "text-[#801323] bg-gray-50"
                          : "text-[#0d0c12]"
                      }`}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

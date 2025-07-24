import React from 'react';
import './CoursesMain.css';

const CoursesMain = () => {
  return (
    <div className="mc-container">
      <div className="mc-top">
        <div className="searchbar-container">
          <input
            type="text"
            name="Searchbar"
            id="search-bar"
            placeholder="Search Here"
          />
          <button>Search</button>
        </div>
        <div className="sorting-mechanism">
          <span>Filter by: </span>
          <select name="Filter" id="select-button">
            <option value="All">All</option>
            <option value="Latest">Latest to Oldest</option>
            <option value="Oldest">Oldest to Latest</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default CoursesMain

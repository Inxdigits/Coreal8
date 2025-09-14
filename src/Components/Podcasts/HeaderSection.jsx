import React, { useEffect, useRef } from "react";
import "./Podcasts.css";

export const HeaderSection = ({
  selectedCategory,
  setSelectedCategory,
  selectedSort,
  setSelectedSort,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    { id: "all", label: "All", value: "All", activeColor: "#0d0c12" },
    {
      id: "leadership",
      label: "Leadership",
      value: "Leadership",
      activeColor: "#801323",
    },
    {
      id: "personal-growth",
      label: "Legacy",
      value: "Legacy",
      activeColor: "#0d0c12",
    },
    {
      id: "mental-health",
      label: "Lifestyle",
      value: "Lifestyle",
      activeColor: "#0d0c12",
    },
  ];

  const sortOptions = [
    { id: "newest", label: "Newest", value: "Newest" },
    { id: "oldest", label: "Oldest", value: "Oldest" },
    { id: "popular", label: "Popular", value: "Popular" },
  ];

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSortSelect = (sortOption) => {
    setSelectedSort(sortOption);
    setIsDropdownOpen(false);
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between category-header">
      {/* Categories */}
      <nav className="flex gap-2.5 categories" aria-label="Podcast categories">
        {categories.map((category) => {
          const isActive = selectedCategory === category.value;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.value)}
              type="button"
              aria-pressed={isActive}
              className={`sort-tile px-5 py-2.5 rounded-[15px] border transition-colors duration-200 
                ${
                  isActive
                    ? "bg-transparent border-[#801323]"
                    : "bg-white border-[#0d0c121a] hover:bg-gray-50"
                }`}
            >
              <span
                className={`text-[16px] font-semibold ${
                  isActive
                    ? `text-[${category.activeColor}]`
                    : "text-[#0d0c12] opacity-60 hover:opacity-80"
                }`}
              >
                {category.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Sort Dropdown */}
      <div className="flex gap-4 sort items-center" ref={dropdownRef}>
        <label htmlFor="sort-dropdown" className="text-base text-[#0d0c12]">
          Sort by:
        </label>
        <div className="relative">
          <button
            id="sort-dropdown"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            type="button"
            className="filter-dropdown flex items-center gap-2"
          >
            <span className="text-[16px] font-semibold text-[#0d0c12] opacity-60 hover:opacity-80">
              {selectedSort}
            </span>
            <svg
              className={`transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
              width="10"
              height="5"
              viewBox="0 0 10 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.61383 0.134658L9.32049 0.841991L5.46916 4.69466C5.40745 4.75676 5.33406 4.80605 5.25323 4.83968C5.1724 4.87331 5.08571 4.89063 4.99816 4.89063C4.91061 4.89063 4.82392 4.87331 4.74309 4.83968C4.66226 4.80605 4.58887 4.75676 4.52716 4.69466L0.673828 0.841991L1.38049 0.135324L4.99716 3.75132L8.61383 0.134658Z"
                fill="#0D0C12"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <ul
              role="listbox"
              aria-labelledby="sort-dropdown"
              className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-[#0d0c121a] z-10"
            >
              {sortOptions.map((option) => (
                <li
                  key={option.id}
                  role="option"
                  aria-selected={selectedSort === option.value}
                >
                  <button
                    onClick={() => handleSortSelect(option.value)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100"
                    type="button"
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

import React, { useState } from "react";
import "./Podcasts.css"; // Import the CSS file for styling
import Arrow from "../../Assets/PodcastPageAssests/arrow.svg";

export const HeaderSection = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSort, setSelectedSort] = useState("Newest");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const categories =
    [{
        id: "all", label: "All", value: "All"
    },
    { id: "leadership", label: "Leadership", value: "Leadership" },
    { id: "personal-growth", label: "Legacy", value: "Legacy" },
    { id: "mental-health", label: "Lifestyle", value: "Lifestyle" },
    ];

    const sortOptions = [
        {id: "newest", label: "Newest", value: "Newest"},
        {id: "oldest", label: "Oldest", value: "Oldest"},
        {id: "popular", label: "Popular", value: "Popular"},
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
    const handleSortSelect = (sortOption) => {
        setSelectedSort(sortOption);
        setIsDropdownOpen(false);
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return(
        <header className="flex items-center justify-between category-header">
            <nav className="flex gap-2.5 p-0 categories">
                {categories.map((category) => (
                    <button
                    key={category.id}
                    onClick={()=> handleCategoryClick(category.value)}
                    className={`sort-tile items-center justify-center gap-2.5 px-5 py-2.5 mt-[-1.00px] mb[-1.00px] rounded-[15px] overflow-hidden border border-solid inline-flex relative flex-[0_0_auto] transition-colors duration-200 hover:opacity-80 focus:outline-none focus:ring-offset-2 focus:ring-[#801323] focus:ring-opacity-50 bg-white ${category.id === "all" ? "ml-[-1.00px]" : ""} ${category.id === "legacy" ? "mr-[-1.00px]" : ""} rounded-[15px] overflow-hidden border border-solid transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        selectedCategory === category.value? category.value === "Leadership" ? "border-[#801323] bg-transparent": "bg-white border-[#0d0c121a": "bg-white border-[#0d0c121a] hover:bg-gray-50"}`} 
                        aria-pressed={selectedCategory === category.value} type="button">
                            <span className={`relative text-[16px] font-semibold ${selectedCategory === category.value && category.value === "Leadership" ? "text-[#801323]" : "text-[#0d0c12] opacity-60 hover:opacity-80"}`}>
                                {category.label}
                            </span>
                        </button>
                    ))}
            </nav>
            <div className="flex gap-4 sort">
                <label className="content-center relative w-fit [font-family: 'Schibsted_Grotesk-Regular', Helvetica] font-normal text-[#0d0c12] text-base text-center tracking-[0] leading-[normal] align-middle" htmlFor="sort-dropdown">
                    Sort by:
                </label>
                <div className=" relative flex items-center justify-center sort-btn">
                    <button id="sort-dropdown" onClick={toggleDropdown} className="content-center flex flex-row gap-2.5 relative w-fit [font-family: 'Schibsted_Grotesk-Regular', Helvetica] font-normal text-[#0d0c12] text-base text-center tracking-[0] leading-[normal]"
                    aria-expanded={isDropdownOpen} aria-haspopup="listbox" type="button">
                        <span className="relative text-[16px] font-semibold text-[#0d0c12] opacity-60 hover:opacity-80 w-fit">
                            {selectedSort}
                        </span>
                        <div className={`relative transition-transform overflow-hidden duration-200 ${isDropdownOpen? "rotate-180" : "rotate-0"}`}>
                            <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.61383 0.134658L9.32049 0.841991L5.46916 4.69466C5.40745 4.75676 5.33406 4.80605 5.25323 4.83968C5.1724 4.87331 5.08571 4.89063 4.99816 4.89063C4.91061 4.89063 4.82392 4.87331 4.74309 4.83968C4.66226 4.80605 4.58887 4.75676 4.52716 4.69466L0.673828 0.841991L1.38049 0.135324L4.99716 3.75132L8.61383 0.134658Z" fill="#0D0C12"/>
</svg>
                        
                        </div>

                    </button>
                    {isDropdownOpen && (
                        <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-[#0d0c121a]">
                            <ul role="listbox" aria-labelledby="sort-dropdown">
                                {sortOptions.map((option) => (
                                    <li key={option.id}
                                    role="option"
                                    aria-selected={selectedSort === option.value}>
                                        <button onClick={() => handleSortSelect(option.value)}
                                            className="w-full text-left" type="button">
                                            {option.label}
                                        </button>

                                    </li>
                                ))}
                          

                            </ul>

                        </div>
                    )}

                </div>
            </div>
        </header>
    )
}
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
    { id: "personal-growth", label: "Personal Growth", value: "Personal Growth" },
    { id: "mental-health", label: "Mental Health", value: "Mental Health" },
    { id: "strategy", label: "Strategy", value: "Strategy" }];

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
            <nav className="flex gap-2.5 p-0">
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
            <div className="flex gap-4">
                <label className="content-center relative w-fit [font-family: 'Schibsted_Grotesk-Regular', Helvetica] font-normal text-[#0d0c12] text-base text-center tracking-[0] leading-[normal]" htmlFor="sort-dropdown">
                    Sort by:
                </label>
                <div className=" relative flexitems-center justify-center">
                    <button id="sort-dropdown" onClick={toggleDropdown} className="content-center flex flex-row gap-2.5 relative w-fit [font-family: 'Schibsted_Grotesk-Regular', Helvetica] font-normal text-[#0d0c12] text-base text-center tracking-[0] leading-[normal]"
                    aria-expanded={isDropdownOpen} aria-haspopup="listbox" type="button">
                        <span className="relative text-[16px] font-semibold text-[#0d0c12] opacity-60 hover:opacity-80 w-fit">
                            {selectedSort}
                        </span>
                        <div className={`relative transition-transform overflow-hidden duration-200 ${isDropdownOpen? "rotate-180" : "rotate-0"}`}>
                            <img src={Arrow} alt="Sort options" className="w-5 h-5" aria-hidden="true"/>
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
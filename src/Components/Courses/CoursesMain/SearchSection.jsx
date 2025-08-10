import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import arrowdown from '../../../Assets/arrowdown.svg';
import Search from "../../../Assets/BlogPageAssets/search.svg"
import "./CoursesMain.css"

export const SearchSection = () => {
 
   //search functionality
      const [searchValue, setSearchValue] = useState("");
      const handleSearchChange = (e) => {
          setSearchValue(e.target.value);
      };
      const handleSubmit = (e) => {
          e.preventDefault();
          console.log("Search submitted:", searchValue);
      }
      // filter functionality
      const [selectedFilter, setSelectedFilter] = useState("All");
      const[selectedSort, setSelectedSort] = useState("Leadership & Influence");
      const[isDropDownOpen, setIsDropdownOpen] = useState(false);
  
      const filterOptions = [
          {id: "all", label: "All"},
          {id:"leadership", label: "Leadership"},
          {id:"lifestyle", label: "Lifestyle"},
          {id:"legacy", label: "Legacy"},
      ];
      const sortOptions = ["Leadership & Influence", "Oldest", "Popular", "Trending"];
  
      const handleFilterClick = (filterId, label) =>{
          setSelectedFilter(label);
      }
      const handleSortSelect = (option) => {
          setSelectedSort(option);
          setIsDropdownOpen(false); // Close dropdown after selection
      }

      return(
         <nav className=' flex justify-between items-center relative' role="navigation" aria-label='Content filters and sorting'>
             <form onSubmit={handleSubmit} className="inline-flex flex-row  gap-3 flex-[0_0_auto] relative" role='search' aria-label='Search blogs'>
                        <div className='flex w-[502px] input rounded-2xl border border-solid border-[#0d0c121a]  relative'> 
                            
                            <div className='relative w-6 h-6' aria-hidden="true">
                            <div className='relative w-5 h-5 top-0.5 left-0.5'>
                                <img src={Search} alt="Search Icon" className='' />
            
                            </div>
            
                        </div>
                        <label htmlFor="search-input" className="sr-only">Search Courses...</label>
                        <input
                        id='search-input'
                            type="search"
                            value={searchValue}
                            onChange={handleSearchChange}
                            placeholder="Search Courses..."
                            aria-describedby='search-description'
                            className="relative w-full [font-family: 'Schibsted_Grotesk-Regular', Helvetica] font-normal text-[#0d0c12] text-base text-[16px] t leading-[normal] tracking-[0] placeholder:text-[#0d0c12b3] bg-transparent border-none focus:outline-none"
                            />
                            <span id='search-description' className="sr-only">Search Courses by keywords or blog posts</span>
                     
                        </div>
                        <button type="submit" aria-label='Submit search' className="bg-[#801323] text-white search-btn rounded-lg hover:bg-[#6a0f1c] transition-colors duration-300 " >
                       <span className='relative w-fit font-medium text-neutral-50 text-base tracking-[0] leading-[normal]'>Search</span>
                       </button>
                      </form>
            

            <div className='flex gap-4'>
                <label className="content-center relative w-fit [font-family: 'Schibsted_Grotesk-Regular', Helvetica] font-normal text-[#0d0c12] text-base text-center tracking-[0] leading-[normal]">
                    Filter by:
                    </label>

                    <div className='relative'>
                        <button
                        onClick={() => setIsDropdownOpen(!isDropDownOpen)}
                        className="sort-tile items-center justify-center gap-2.5 px-5 py-2.5 mt-[-1.00px] mb[-1.00px] rounded-[15px] overflow-hidden border border-solid inline-flex relative flex-[0_0_auto] transition-colors duration-200 hover:opacity-80 focus:outline-none focus:ring-offset-2 focus:ring-[#801323] focus:ring-opacity-50 bg-white"
                        aria-expanded={isDropDownOpen}
                        aria-haspopup="listbox"
                        type='button'
                        >
                            <span className='relative w-fit'>{selectedSort}</span>
                            <div className={`items-center justify-center flex relative w-5 h-5 overflow-hidden transition-transform duration-200 ${isDropDownOpen ? "rotate-180" : "rotate-0"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                                
                            </div>

                        </button>
                        {isDropDownOpen && (
                            <div className='absolute top-full right-0 mt-1 bg-white border border-solid border-[#0d0c121a] rounded-lg shadow-lg z-10 min-w-full' >
                                <ul role="listbox" aria-label="Sort options" className='py-1'>
                                    {sortOptions.map((option) => (
                                        <li key={option}
                                        role='option'
                                        aria-selected={selectedSort === option}>
                                            <button onClick={() => handleSortSelect(option)}
                                                className={`w-full px-5 py-2.5 text-left [font-family:'Schibsted_Grotesk-Regular', Helvetica] font-normal text-base tracking-[0] leading-[normal] transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:outline-none focus:bg-gray-50 ${selectedSort=== option? "text-[#801323] bg-gray-50" : "text-[#0d0c12] "}`}
                                                type='button'>
                                                {option}
                                            </button>

                                        </li>
                                    ))}

                                </ul>
                            </div>

                        )}
                    </div>
            </div>


        </nav>
      )
      
};

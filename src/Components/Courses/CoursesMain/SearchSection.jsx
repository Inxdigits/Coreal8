import React, { useState } from "react";
// import vector7 from "./vector-7.svg";
// import vector8 from "./vector-8.svg";
// import vector from "./vector.svg";

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(
    "Leadership & Influence"
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterOptions = [
    "Leadership & Influence",
    "Technology & Innovation",
    "Business Strategy",
    "Personal Development",
    "Marketing & Sales",
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleFilterSelect = (option) => {
    setSelectedFilter(option);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
      <form
        onSubmit={handleSearchSubmit}
        className="inline-flex items-center justify-center gap-3 relative flex-[0_0_auto]"
      >
        <div className="flex w-[502px] items-center gap-2.5 px-5 py-4 relative ml-[-1.00px] rounded-[15px] overflow-hidden border border-solid border-[#0d0c121a]">
          <div className="relative w-6 h-6" role="img" aria-label="Search icon">
            <div className="relative w-5 h-5 top-0.5 left-0.5">
              {/* <img
                className="absolute w-1.5 h-1.5 top-3.5 left-3.5"
                alt=""
                src={vector7}
              /> */}
              {/* <img
                className="absolute w-[18px] h-[18px] top-0 left-0"
                alt=""
                src={vector8}
              /> */}
            </div>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="relative w-full bg-transparent border-none outline-none [font-family:'Schibsted_Grotesk-Regular',Helvetica] font-normal text-[#0d0c12] text-base tracking-[0] leading-[normal] placeholder:text-[#0d0c1280]"
            aria-label="Search courses"
          />
        </div>

        <button
          type="submit"
          className="all-[unset] box-border inline-flex items-center justify-center gap-3 px-[50px] py-5 relative flex-[0_0_auto] bg-[#801323] rounded-[10px] overflow-hidden shadow-[inset_0px_0px_5px_#ffdb58] cursor-pointer hover:bg-[#6b1020] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#801323] focus:ring-offset-2"
          aria-label="Search courses"
        >
          <div className="relative w-fit [font-family:'Schibsted_Grotesk-Medium',Helvetica] font-medium text-neutral-50 text-base tracking-[0] leading-[normal]">
            Search
          </div>
        </button>
      </form>

      <div className="inline-flex items-center gap-4 relative self-stretch flex-[0_0_auto]">
        <label className="relative w-fit [font-family:'Schibsted_Grotesk-Regular',Helvetica] font-normal text-[#0d0c1280] text-base text-center tracking-[0] leading-[normal]">
          Filter by:
        </label>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="inline-flex items-center justify-center gap-3 px-5 py-2.5 relative flex-[0_0_auto] mr-[-1.00px] bg-white rounded-[15px] overflow-hidden border border-solid border-[#0d0c121a] cursor-pointer hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#801323] focus:ring-offset-2"
            aria-expanded={isFilterOpen}
            aria-haspopup="listbox"
            aria-label="Filter options"
          >
            <div className="relative w-fit [font-family:'Schibsted_Grotesk-Regular',Helvetica] font-normal text-[#0d0c12] text-base text-center tracking-[0] leading-[normal]">
              {selectedFilter}
            </div>

            <div
              className={`relative w-2.5 h-5 overflow-hidden transition-transform duration-200 ${
                isFilterOpen ? "rotate-180" : "rotate-90"
              }`}
            >
              {/* <img
                className="absolute w-[11px] h-1.5 top-[7px] left-0 -rotate-90"
                alt=""
                src={vector}
              /> */}
            </div>
          </button>

          {isFilterOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-[15px] border border-solid border-[#0d0c121a] shadow-lg z-10">
              <ul role="listbox" className="py-2">
                {filterOptions.map((option, index) => (
                  <li
                    key={index}
                    role="option"
                    aria-selected={option === selectedFilter}
                  >
                    <button
                      type="button"
                      onClick={() => handleFilterSelect(option)}
                      className={`w-full px-5 py-2.5 text-left [font-family:'Schibsted_Grotesk-Regular',Helvetica] font-normal text-base tracking-[0] leading-[normal] hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-100 ${
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

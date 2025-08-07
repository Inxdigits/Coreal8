import React, {useState} from 'react';
import Search from "../../Assets/BlogPageAssets/search.svg";
import "./Blog.css"; // Import the CSS file for styling
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import { BlogCard } from './blogcard.jsx';
import Read from '../../Assets/BlogPageAssets/read.svg';
import Blog1 from '../../Assets/BlogPageAssets/blog1.jpg';
import Blog2 from '../../Assets/BlogPageAssets/blog2.jpg';
import Blog3 from '../../Assets/BlogPageAssets/blog3.jpg';
import Blog4 from '../../Assets/BlogPageAssets/blog4.jpg';
import Line from '../../Assets/BlogPageAssets/line.svg';

const Blog = () => {

    // blog posts
    const blogPosts = [
        {
            id:1,
            image: Blog1,
            date:"May 16, 2025",
            readTime:"5 min read",
            title: "5 Habits of a Grounded Leader",
            description: "Explore the essential habits that define grounded leadership and how they can transform your approach to leading teams and organizations.",
            divider: Line,
            icon: Read,
            category: "Leadership",
        },
        {
            id:2,
            image: Blog2,
            date:"May 16, 2025",
            title: "The Art of Mindful Living",
            description: "Discover the principles of mindful living and how they can enhance your daily life, from stress reduction to improved focus and well-being.",
            readTime:"4 min read",
            divider: Line,
            icon: Read,
            category: "Lifestyle",
        },
        {
            id:3,
            image: Blog3,
            date:"May 16, 2025",
            title: "Building a Legacy of Impact",
            description: "Learn how to create a lasting legacy through your work and personal life, focusing on values, impact, and community engagement.",
            readTime:"6 min read",
            divider: Line,
            icon: Read,
            category: "Legacy",
        },
       
    ]
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
    const[selectedSort, setSelectedSort] = useState("Newest");
    const[isDropDownOpen, setIsDropdownOpen] = useState(false);

    const filterOptions = [
        {id: "all", label: "All"},
        {id:"leadership", label: "Leadership"},
        {id:"lifestyle", label: "Lifestyle"},
        {id:"legacy", label: "Legacy"},
    ];
    const sortOptions = ["Newest", "Oldest", "Popular", "Trending"];

    const handleFilterClick = (filterId, label) =>{
        setSelectedFilter(label);
    }
    const handleSortSelect = (option) => {
        setSelectedSort(option);
        setIsDropdownOpen(false); // Close dropdown after selection
    }
    return (
       <>
       <Navbar/>
        <section className=" flex-col items-center justify-center p-20 relative bg-[#80132314] services-header">
        <header className=" relative mt-[-2.00px] [font-family: 'Montserrat-Bold', sans-serif] font-bold text-[#801323] text-[40px] text-center tracking-[0] leading-[normal] gap-3 flex flex-col">
          Insights & Reflections
           <p>
          Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
        </header>
       
        <form onSubmit={handleSubmit} className="flex incline-flex flex-row items-center justify-center gap-3 flex-[0_0_auto] relative" role='search' aria-label='Search blogs'>
            <div className='flex flex-row w-[502px] input rounded-2xl border border-solid border-[#0d0c121a] items-center relative'> 
                
                <div className='relative w-6 h-6' aria-hidden="true">
                <div className='relative w-5 h-5 top-0.5 left-0.5'>
                    <img src={Search} alt="Search Icon" className='' />

                </div>

            </div>
            <label htmlFor="search-input" className="sr-only">Search Blogs</label>
            <input
            id='search-input'
                type="search"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search blogs..."
                aria-describedby='search-description'
                className="relative w-full [font-family: 'Schibsted_Grotesk-Regular', Helvetica] font-normal text-[#0d0c12] text-base text-[16px] text-[#0d0c12] leading-[normal] tracking-[0] placeholder:text-[#0d0c12b3] bg-transparent border-none focus:outline-none"
                />
                <span id='search-description' className="sr-only">Search blogs by keywords or blog posts</span>
         
            </div>
            <button type="submit" aria-label='Submit search' className="bg-[#801323] text-white search-btn rounded-lg hover:bg-[#6a0f1c] transition-colors duration-300 " >
           <span className='relative w-fit font-medium text-neutral-50 text-base tracking-[0] leading-[normal]'>Search</span>
           </button>
          </form>



      </section>

      <section className='blog-section '>
        <nav className='nav flex items-center justify-between relative' role="navigation" aria-label='Content filters and sorting'>
            <div className='items-center gap-4 inline-flex relative flex-[0_0_auto]' role='group' aria-label='filter options'>
                {filterOptions.map((option) => (
                    <button
                    key={option.id}
                    onClick={() => handleFilterClick(option.id, option.label)}
                    className={`tiles items-start gap-2.5 px-2.5 mt-[-1.00px] mb[-1.00px] ${option.id === "all" ? "ml-[-1.00px]" : ""} ${option.id === "legacy" ? "mr-{-1.00px]" : ""} "rounded-[15px] overflow-hidden border border-solid inline-flex relative flex-[0_0_auto] transition-colors duration-200 hover:opacity-80 focus:outline-none focus:ring-offset-2 focus:ring-[#801323] focus:border-[#801323] focus:ring-opacity-50 ${selectedFilter === option.label ? "border-[#801323] bg-transparent " : "border-[#0d0c121a] bg-white "}`}
                    aria-pressed={selectedFilter === option.label}
                    type="button"
                    >
               
                              <span className={`relative w-fit [font-family: 'Schibsted_Grotesk-Regular', Helvetica] font-normal text-[#0d0c12] text-base text-center tracking-[0] leading-[normal] ${selectedFilter === option.label ? "text-[#801323]" : "text-[#0d0c12]" }`}>

                        {option.label}</span>
                    </button>
                 )
                 )
              }

            </div>

            <div className='flex gap-4'>
                <label className="content-center relative w-fit [font-family: 'Schibsted_Grotesk-Regular', Helvetica] font-normal text-[#0d0c12] text-base text-center tracking-[0] leading-[normal]">
                    Sort by:
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
                            <div className={`items-center justify-center flex relative w-2.5 h-5 overflow-hidden transition-transform duration-200 ${isDropDownOpen ? "rotate-180" : "rotate-0"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#801323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <div className= "spacer-50"></div>
       <BlogCard />
        <article className="big-blog-card  inline-flex flex-col items-center gap-4  relative flex[0_0_auto] bg-white rounded-[5px] overflow-hidden shadow-[0px_10px_50px_#0000001a">

                <img src={Blog4} alt="Habits of a Grounded Leader" className="blog-image object-cover rounded-[5px]" />
                <div className="blog-content flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <time className="relative w-fit font-normal text-[#0d0c12] text-base text-center tracking-[0] leading-[normal]">May 16, 2025</time>
                    <img className="relative w-px h-[25px] object-cover" alt="Divider" src={Line}/>
                    <span className="relative w-fit font-normal text-[#0d0c12] text-base text-center tracking-[0] leading-[normal]">10 min read</span>
                </div>
                <div className='w-full'>
                    <h3>5 Habits of a Grounded Leader</h3>
                    <p>Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
                </div>
                <div className="flex items-center gap[13px] relative self-stretch w-full flex-[0_0_auto]">
                    <a href="#" className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto] rounded-[5px] overflow-hidden hover:opacity-80 transition-opacity" aria-label={`Read blog post:"5 Habits"`}>
                        <span className="relative w-fit mt-[-1.00px] font-semibold text-[#801323] text-base tracking-[0] leading-[normal]">
                            Read Blog
                        </span>
                        <div className="relative w-5 h-5">
                            <img className="absolute w-[20px] h-[20px] left-0.5" alt="open link" src={Read}/>
                        </div>
                    </a>
                </div>
            </article>
            <BlogCard/>
      </section>

      <Footer/>
       
       </>
    );
    }

    export default Blog;
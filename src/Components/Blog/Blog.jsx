import React, { useState, useMemo, useRef, useEffect } from "react";
import Search from "../../Assets/BlogPageAssets/search.svg";
import "./Blog.css";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { BlogCard } from "./blogcard.jsx";
import Read from "../../Assets/BlogPageAssets/read.svg";
import Blog1 from "../../Assets/BlogPageAssets/blog1.jpg";
import Blog2 from "../../Assets/BlogPageAssets/blog2.jpg";
import Blog3 from "../../Assets/BlogPageAssets/blog3.jpg";
import Blog4 from "../../Assets/BlogPageAssets/blog4.jpg";
import Line from "../../Assets/BlogPageAssets/line.svg";

const blogPosts = [
  {
    id: 1,
    image: Blog1,
    date: "May 16, 2025",
    isoDate: "2025-05-16",
    readTime: "5 min read",
    title: "5 Habits of a Grounded Leader",
    description:
      "Explore the essential habits that define grounded leadership and how they can transform your approach to leading teams and organizations.",
    divider: Line,
    icon: Read,
    category: "Leadership",
    popularity: 120,
  },
  {
    id: 2,
    image: Blog2,
    date: "May 16, 2025",
    isoDate: "2025-05-16",
    title: "The Art of Mindful Living",
    description:
      "Discover the principles of mindful living and how they can enhance your daily life, from stress reduction to improved focus and well-being.",
    readTime: "4 min read",
    divider: Line,
    icon: Read,
    category: "Lifestyle",
    popularity: 85,
  },
  {
    id: 3,
    image: Blog3,
    date: "May 16, 2025",
    isoDate: "2025-05-16",
    title: "Building a Legacy of Impact",
    description:
      "Learn how to create a lasting legacy through your work and personal life, focusing on values, impact, and community engagement.",
    readTime: "6 min read",
    divider: Line,
    icon: Read,
    category: "Legacy",
    popularity: 200,
  },
];

const filterOptions = [
  { id: "all", label: "All" },
  { id: "leadership", label: "Leadership" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "legacy", label: "Legacy" },
];

const sortOptions = ["Newest", "Oldest", "Popular", "Trending"];

const Blog = () => {
  // search
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // optional: navigate or analytics
  };

  // filter & sort
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [isDropDownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // pagination / show more
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    if (!isDropDownOpen) return;
    const onDocumentClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", onDocumentClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isDropDownOpen]);

  const handleFilterClick = (label) => {
    setSelectedFilter(label);
  };

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setIsDropdownOpen(false);
  };

  // derive filtered & sorted posts
  const filteredSortedPosts = useMemo(() => {
    const q = searchValue.trim().toLowerCase();

    // filter by category
    let result = blogPosts.filter((p) => {
      if (selectedFilter === "All") return true;
      return p.category.toLowerCase() === selectedFilter.toLowerCase();
    });

    // search filter (title, description, category)
    if (q.length > 0) {
      result = result.filter((p) => {
        return (
          p.title.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q))
        );
      });
    }

    // sort
    result = result.slice(); // copy
    if (selectedSort === "Newest") {
      result.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
    } else if (selectedSort === "Oldest") {
      result.sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate));
    } else if (selectedSort === "Popular") {
      result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (selectedSort === "Trending") {
      // basic trending score: popularity / (ageInDays + 1)
      result.sort((a, b) => {
        const ageA = Math.max(
          0,
          Math.floor((Date.now() - new Date(a.isoDate)) / (1000 * 60 * 60 * 24))
        );
        const ageB = Math.max(
          0,
          Math.floor((Date.now() - new Date(b.isoDate)) / (1000 * 60 * 60 * 24))
        );
        const scoreA = (a.popularity || 0) / (ageA + 1);
        const scoreB = (b.popularity || 0) / (ageB + 1);
        return scoreB - scoreA;
      });
    }

    return result;
  }, [searchValue, selectedFilter, selectedSort]);

  const visiblePosts = filteredSortedPosts.slice(0, postsPerPage);
  const hasMore = filteredSortedPosts.length > visiblePosts.length;

  return (
    <>
      <Navbar />
      <main className="blog-page">
        <section className="blog-hero">
          <header className="hero-inner">
            <h1 className="hero-title">Insights & Reflections</h1>
            <p className="hero-sub">
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="search-form"
            role="search"
            aria-label="Search blogs"
          >
            <div className="search-input-wrapper">
              <div className="search-icon" aria-hidden="true">
                <img src={Search} alt="" />
              </div>

              <label htmlFor="search-input" className="sr-only">
                Search Blogs
              </label>
              <input
                id="search-input"
                type="search"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search blogs..."
                aria-describedby="search-description"
                className="search-input"
              />
              <span id="search-description" className="sr-only">
                Search blogs by keywords or blog posts
              </span>
            </div>

            <button
              type="submit"
              aria-label="Submit search"
              className="dark-bg-btn"
            >
              <span>Search</span>
            </button>
          </form>
        </section>

        <section className="blog-section">
          <nav
            className="filters-nav"
            role="navigation"
            aria-label="Content filters and sorting"
          >
            <div
              className="filter-buttons"
              role="group"
              aria-label="filter options"
            >
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleFilterClick(option.label)}
                  className={
                    "filter-button" +
                    (selectedFilter === option.label ? " active" : "")
                  }
                  aria-pressed={selectedFilter === option.label}
                  type="button"
                >
                  <span className="filter-label">{option.label}</span>
                </button>
              ))}
            </div>

            <div className="sort-area">
              <label className="sort-label">Sort by:</label>

              <div className="sort-wrap" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen((s) => !s)}
                  className={"sort-button" + (isDropDownOpen ? " open" : "")}
                  aria-expanded={isDropDownOpen}
                  aria-haspopup="listbox"
                  type="button"
                >
                  <span className="sort-selected">{selectedSort}</span>
                  <span className="sort-caret" aria-hidden="true">
                    ▾
                  </span>
                </button>

                {isDropDownOpen && (
                  <div
                    className="sort-dropdown"
                    role="listbox"
                    aria-label="Sort options"
                  >
                    <ul className="sort-list">
                      {sortOptions.map((option) => (
                        <li
                          key={option}
                          role="option"
                          aria-selected={selectedSort === option}
                        >
                          <button
                            onClick={() => handleSortSelect(option)}
                            className={
                              "sort-option" +
                              (selectedSort === option ? " selected" : "")
                            }
                            type="button"
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
          </nav>

          {/* Blog list */}
          {visiblePosts.length > 0 ? (
            <BlogCard posts={visiblePosts} />
          ) : (
            <div className="no-results" role="status" aria-live="polite">
              No posts found matching your search / filters.
            </div>
          )}

          {/* Show more */}
          {hasMore && (
            <div className="show-more-wrap">
              <button
                type="button"
                className="show-more-button"
                onClick={() => setPostsPerPage((p) => p + 6)}
              >
                Show more
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Blog;

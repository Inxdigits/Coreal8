import React, { useState, useMemo, useRef, useEffect } from "react";
import Search from "../../Assets/BlogPageAssets/search.svg";
import "./Blog.css";
import "./BlogDetail.css";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { BlogCard } from "./Blogcard.jsx";
import { blogPosts } from "./BlogData.js";
import { filterOptions, sortOptions, sortPosts } from "./BlogHelpers.js";

const Blog = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // ✅ Debounce
  const [selectedFilter, setSelectedFilter] = useState(
    localStorage.getItem("blogFilter") || "All"
  );
  const [selectedSort, setSelectedSort] = useState(
    localStorage.getItem("blogSort") || "Newest"
  );
  const [isDropDownOpen, setIsDropdownOpen] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const dropdownRef = useRef(null);

  // ✅ Scroll listener
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Close dropdown on outside click / escape
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

  // ✅ Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 400); // 400ms delay
    return () => clearTimeout(handler);
  }, [searchValue]);

  // ✅ Persist filter & sort
  useEffect(() => {
    localStorage.setItem("blogFilter", selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
    localStorage.setItem("blogSort", selectedSort);
  }, [selectedSort]);

  // ✅ Filter + Search + Sort
  const filteredSortedPosts = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    let result = blogPosts.filter((p) =>
      selectedFilter === "All"
        ? true
        : p.category.toLowerCase() === selectedFilter.toLowerCase()
    );
    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q))
      );
    }
    return sortPosts(result, selectedSort);
  }, [debouncedSearch, selectedFilter, selectedSort]);

  const visiblePosts = filteredSortedPosts.slice(0, postsPerPage);
  const hasMore = filteredSortedPosts.length > visiblePosts.length;

  return (
    <>
      <Navbar />
      <main className="blog-page">
        {/* Hero + Search */}
        <section className="blog-hero">
          <header className="hero-inner">
            <h1 className="hero-title">Insights & Reflections</h1>
            <p className="hero-sub">
              Explore thought-provoking articles and insights from Dr. Ezekiel’s
              reflections, experiences, and vision for Africa’s future.
            </p>
          </header>

          <form
            className="search-form"
            role="search"
            aria-label="Search blogs"
            onSubmit={(e) => e.preventDefault()}
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
                onChange={(e) => setSearchValue(e.target.value)}
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

        {/* Blog Section */}
        <section className="blog-section">
          <nav className="filters-nav" aria-label="Content filters and sorting">
            {/* Filters */}
            <div
              className="filter-buttons"
              role="group"
              aria-label="filter options"
            >
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedFilter(option.label)}
                  className={
                    "filter-button" +
                    (selectedFilter === option.label ? " active" : "")
                  }
                  aria-pressed={selectedFilter === option.label}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Sort */}
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
                  {selectedSort}
                </button>
                {isDropDownOpen && (
                  <ul className="sort-dropdown" role="listbox">
                    {sortOptions.map((option) => (
                      <li
                        key={option}
                        role="option"
                        aria-selected={selectedSort === option}
                      >
                        <button
                          onClick={() => {
                            setSelectedSort(option);
                            setIsDropdownOpen(false);
                          }}
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
                )}
              </div>
            </div>
          </nav>
          {/* Blog Count Feedback */}
          <p className="blog-count">
            Showing {visiblePosts.length} of {filteredSortedPosts.length} posts
          </p>
          {/* Blog List */}{" "}
          {visiblePosts.length > 0 ? (
            <BlogCard posts={visiblePosts} />
          ) : (
            <div className="no-results" role="status" aria-live="polite">
              {" "}
              No posts found matching your search / filters.{" "}
            </div>
          )}
          {/* Show More */}
          {hasMore && (
            <div className="show-more-wrap">
              <button
                type="button"
                className="show-more-button"
                aria-label="Show more blog posts"
                onClick={() => setPostsPerPage((p) => p + 6)}
              >
                Show more
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑ Back to Top
        </button>
      )}

      <Footer />
    </>
  );
};

export default Blog;

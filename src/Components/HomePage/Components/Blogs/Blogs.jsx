import React from "react";
import { Link } from "react-router-dom";
import "../../Reuse.css";
import "../Leadership/Leadership.css";
import "./Blogs.css";
import { BlogCard } from "../../../Blog/Blogcard.jsx";
import { blogPosts } from "../../../Blog/BlogData.js";

const Blogs = () => {
  const featuredBlogs = blogPosts.slice(0, 3);

  return (
    <div className="blogs-container flex-column container">
      <div className="blog-header">
        <span>BLOGS</span>
      </div>
      <div className="blog-writeup">
        <h1>Featured Blogs</h1>
        <p>
          Explore thought-provoking articles and insights from Dr. Ezekiel’s
          reflections, experiences, and vision for Africa’s future.
        </p>
      </div>

      {/* ✅ Use BlogCard component here */}
        <BlogCard posts={featuredBlogs} />

      <Link to="/blog" className="blogs-button">
        <button className="dark-bg-btn">Read More Insights</button>
      </Link>
    </div>
  );
};

export default Blogs;

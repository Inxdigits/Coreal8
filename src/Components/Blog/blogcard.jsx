import React from "react";
import { Link } from "react-router-dom";

const BlogCardItem = ({ post }) => {
  return (
    <article className="post-card" aria-labelledby={`title-${post.id}`}>
      <img
        src={post.image}
        alt={post.title}
        className="post-image"
        loading="lazy"
      />
      <div className="post-meta">
        <time className="post-time">{post.date}</time> |{" "}
        {post.readTime && (
          <span className="post-readtime">{post.readTime}</span>
        )}
      </div>
      <div className="post-body">
        <h3 id={`title-${post.id}`} className="post-title">
          {post.title}
        </h3>
        <p className="post-excerpt">{post.description}</p>
      </div>
      <div className="post-actions">
        <Link
          to={`/blogs/${post.slug}`}
          className="read-link"
          aria-label={`Read ${post.title}`}
        >
          <span className="read-link-text">Read Blog</span>
          {post.icon && (
            <img src={post.icon} alt="" className="read-link-icon" />
          )}
        </Link>
      </div>
    </article>
  );
};

export const BlogCard = ({ posts = [] }) => (
  <section className="posts-grid" role="list">
    {posts.map((post) => (
      <BlogCardItem key={post.id} post={post} />
    ))}
  </section>
);

import React from "react";

/**
 * BlogCard and BlogCardItem expect `posts` to be passed as a prop.
 * posts: [{ id, image, date, isoDate, readTime, title, description, divider, icon, category, popularity }]
 */

const BlogCardItem = ({ post }) => {
  return (
    <article
      className="post-card"
      role="article"
      aria-labelledby={`title-${post.id}`}
    >
      <img
        src={post.image}
        alt={post.title}
        className="post-image"
        loading="lazy"
      />
      <div className="post-meta">
        <time className="post-time">{post.date}</time>
        {/* {post.divider && (
          <img className="post-divider" alt="" src={post.divider} />
        )} */} |
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
        <a
          href="#"
          className="read-link"
          aria-label={`Read blog post: ${post.title}`}
        >
          <span className="read-link-text">Read Blog</span>
          {post.icon && (
            <div className="read-link-icon">
              <img src={post.icon} alt="" />
            </div>
          )}
        </a>
      </div>
    </article>
  );
};

export const BlogCard = ({ posts = [] }) => {
  return (
    <section className="posts-grid" role="list">
      {posts.map((post) => (
        <BlogCardItem key={post.id} post={post} />
      ))}
    </section>
  );
};

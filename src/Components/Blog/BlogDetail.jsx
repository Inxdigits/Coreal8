import { useParams, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { blogPosts } from "./BlogData.js";

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="blog-detail">
          <h2>Blog not found</h2>
        </main>
        <Footer />
      </>
    );
  }

  // Related blogs = all posts except the current one
  const related = blogPosts.filter((p) => p.id !== post.id);

  return (
    <>
      <Navbar />
      <p className="blog-detail-nav">
        <Link to="/blogs">Blogs</Link>{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="7"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
        >
          <path
            d="M6.62029 5.63755L1.04729 0.327549C0.954302 0.238904 0.83076 0.189453 0.70229 0.189453C0.57382 0.189453 0.450279 0.238904 0.357291 0.327549L0.35129 0.333549C0.306055 0.376522 0.270036 0.428248 0.245422 0.485581C0.220808 0.542914 0.208115 0.604655 0.208115 0.667048C0.208115 0.729442 0.220808 0.791183 0.245422 0.848516C0.270036 0.905849 0.306055 0.957575 0.35129 1.00055L5.59929 6.00055L0.35129 10.9985C0.306055 11.0415 0.270036 11.0932 0.245422 11.1506C0.220808 11.2079 0.208115 11.2697 0.208115 11.332C0.208115 11.3944 0.220808 11.4562 0.245422 11.5135C0.270036 11.5708 0.306055 11.6226 0.35129 11.6655L0.357291 11.6715C0.450279 11.7602 0.57382 11.8096 0.70229 11.8096C0.83076 11.8096 0.954302 11.7602 1.04729 11.6715L6.62029 6.36155C6.6693 6.31485 6.70832 6.25869 6.73498 6.19646C6.76164 6.13424 6.77539 6.06725 6.77539 5.99955C6.77539 5.93185 6.76164 5.86486 6.73498 5.80263C6.70832 5.74041 6.6693 5.68425 6.62029 5.63755Z"
            fill="#801323"
          />
        </svg>{" "}
        <span>{post.title}</span>
      </p>
      <main className="blog-detail">
        <div className="bd-header">
          <h1>{post.title}</h1>
          <p className="blog-meta">
            {post.date} | {post.readTime}
          </p>
        </div>
        <img
          src={post.detailImage}
          alt={post.title}
          className="blog-detail-image"
        />
        <div className="bd-left-main">
          <article
            className="blog-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="bd-right-main">
            <h3>Related Blogs</h3>
            <div className="related-grid">
              {related.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blogs/${blog.slug}`}
                  className="related-card"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="related-image"
                  />
                  <div className="related-info">
                    <p className="semi-bold-blog-text related-blog-title">{blog.title}</p>
                    <p className="related-meta normal-blog-text">
                      {blog.date} | {blog.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;

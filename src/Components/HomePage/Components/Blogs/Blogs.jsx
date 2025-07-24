import React from "react";
import '../../Reuse.css';
import "../Leadership/Leadership.css";
import "./Blogs.css";
import blog1 from "../../Assets/blog1.png";
import blog2 from "../../Assets/blog2.png";
import blog3 from "../../Assets/blog3.png";
import blog4 from "../../Assets/blog4-new.png";
import { IoOpenOutline } from "react-icons/io5";

const Blogs = () => {
  const blogs = [
    {
      img: blog1,
      dateReleased: "May 10, 2025",
      time: "10 minute read",
      title: "5 Habits of a Grounded Leader",
      description:
        "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      img: blog2,
      dateReleased: "May 10, 2025",
      time: "10 minute read",
      title: "5 Habits of a Grounded Leader",
      description:
        "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      img: blog3,
      dateReleased: "May 10, 2025",
      time: "10 minute read",
      title: "5 Habits of a Grounded Leader",
      description:
        "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      img: blog4,
      dateReleased: "May 10, 2025",
      time: "10 minute read",
      title: "5 Habits of a Grounded Leader",
      description:
        "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
  ];

  const Blog = ({ img, dateReleased, time, title, description }) => {
    return (
      <div className="blog">
        <div className="blog-img">
          <img src={img} alt="" />
        </div>
        <div className="about-blog">
          <span>{dateReleased} | {time}</span>
        </div>
        <div className="blog-preview-writeup">
          <p>{title}</p>
          <span>{description}</span>
        </div>
        <a>
          Read blog
          <IoOpenOutline />
        </a>
      </div>
    );
  };

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
      <div className="blogs">
        {blogs.map((blog, index) => (
          <Blog key={index} {...blog} />
        ))}
      </div>
      <div className="blogs-button">
        <button className="dark-bg-btn">Read More Insights</button>
      </div>
    </div>
  );
};

export default Blogs;

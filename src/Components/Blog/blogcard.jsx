import Read from "../../Assets/BlogPageAssets/read.svg";
import Blog1 from "../../Assets/BlogPageAssets/blog1.jpg";
import Blog2 from "../../Assets/BlogPageAssets/blog2.jpg";
import Blog3 from "../../Assets/BlogPageAssets/blog3.jpg";
import Blog4 from "../../Assets/BlogPageAssets/blog4.jpg";
import Line from "../../Assets/BlogPageAssets/line.svg";

import { useWaitlist } from "../../context/WaitListcontext.jsx";

const blogPosts = [
  {
    id: 1,
    image: Blog1,
    date: "May 16, 2025",
    readTime: "5 min read",
    title: "5 Habits of a Grounded Leader",
    description:
      "Explore the essential habits that define grounded leadership and how they can transform your approach to leading teams and organizations.",
    divider: Line,
    icon: Read,
    category: "Leadership",
  },
  {
    id: 2,
    image: Blog2,
    date: "May 16, 2025",
    title: "The Art of Mindful Living",
    description:
      "Discover the principles of mindful living and how they can enhance your daily life, from stress reduction to improved focus and well-being.",
    readTime: "4 min read",
    divider: Line,
    icon: Read,
    category: "Lifestyle",
  },
  {
    id: 3,
    image: Blog3,
    date: "May 16, 2025",
    title: "Building a Legacy of Impact",
    description:
      "Learn how to create a lasting legacy through your work and personal life, focusing on values, impact, and community engagement.",
    readTime: "6 min read",
    divider: Line,
    icon: Read,
    category: "Legacy",
  },
];

const BlogCardItem = ({ post }) => {
  const { openWaitlist } = useWaitlist();

  // blog posts

  return (
    <article className="blog-card inline-flex flex-col items-center gap-4  relative flex[0_0_auto] bg-white rounded-[5px] overflow-hidden shadow-[0px_10px_50px_#0000001a">
      <img
        src={post.image}
        alt={post.title}
        className="blog-image object-cover rounded-[5px]"
      />
      <div className="blog-content flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <time className="relative w-fit font-normal text-[#0d0c12] text-base text-center tracking-[0] leading-[normal]">
          {post.date}
        </time>
        <img
          className="relative w-px h-[25px] object-cover"
          alt="Divider"
          src={post.divider}
        />
        <span className="relative w-fit font-normal text-[#0d0c12] text-base text-center tracking-[0] leading-[normal]">
          {post.readTime}
        </span>
      </div>
      <div>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
      </div>
      <div className="flex items-center gap[13px] relative self-stretch w-full flex-[0_0_auto]">
        <a
          onClick={openWaitlist}
          href="#"
          className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto] rounded-[5px] overflow-hidden hover:opacity-80 transition-opacity"
          aria-label={`Read blog post: ${post.title}`}
        >
          <span className="relative w-fit mt-[-1.00px] font-semibold text-[#801323] text-base tracking-[0] leading-[normal]">
            Read Blog
          </span>
          <div className="relative w-5 h-5">
            <img
              className="absolute w-[20px] h-[20px] left-0.5"
              alt="open link"
              src={post.icon}
            />
          </div>
        </a>
      </div>
    </article>
  );
};

export const BlogCard = () => {
  return (
    <section className="flex items-start gap-6 relative" role="main">
      {blogPosts.map((post) => (
        <BlogCardItem key={post.id} post={post} />
      ))}
    </section>
  );
};

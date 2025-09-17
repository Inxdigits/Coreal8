import React, { useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import "./Podcasts.css";
import Faqs from "./Faqs/Faqs.jsx";
import { HeaderSection } from "./HeaderSection.jsx";
import arrow from "../../Assets/PodcastPageAssests/arrow.svg";
import play from "../../Assets/PodcastPageAssests/play.svg";
import Phone from "../../Assets/PodcastPageAssests/phone.png";
import longImage from "../../Assets/PodcastPageAssests/longImage.jpg";
import Apple from "../../Assets/PodcastPageAssests/applepodcast.png";
import Spotify from "../../Assets/PodcastPageAssests/spotify.png";
import YouTube from "../../Assets/PodcastPageAssests/youtube.png";
import John from "../../Assets/PodcastPageAssests/john.jpg";
import Makamba from "../../Assets/PodcastPageAssests/makambalogo-nobg.png";
import MakambaBig from "../../Assets/PodcastPageAssests/about-makamba.png";
import Solar from "../../Assets/PodcastPageAssests/solar.svg";
import { useWaitlist } from "../../context/WaitListcontext.jsx";

const Podcasts = () => {
  const { openWaitlist } = useWaitlist();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Newest");

  const episodes = [
    {
      id: 1,
      image: longImage,
      title: "Redefining Leadership in a Noisy World",
      description:
        "Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      arrow,
      date: "2025-09-10",
      category: "Leadership",
    },
    {
      id: 2,
      image: longImage,
      title: "From Survival to Strategy",
      description:
        "Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      arrow,
      date: "2025-09-12",
      category: "Lifestyle",
    },
    {
      id: 3,
      image: longImage,
      title: "How to Build a Legacy That Lives After You",
      description:
        "Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      arrow,
      date: "2025-09-14",
      category: "Legacy",
    },
    {
      id: 4,
      image: longImage,
      title: "The Future of African Innovation",
      description:
        "Exploring the role of creativity and resilience in Africa’s tech ecosystem.",
      arrow,
      date: "2025-09-05",
      category: "Leadership",
    },
    {
      id: 5,
      image: longImage,
      title: "Purpose-Driven Leadership",
      description:
        "How leaders can align vision with impact for sustainable growth.",
      arrow,
      date: "2025-08-30",
      category: "Leadership",
    },
    {
      id: 6,
      image: longImage,
      title: "Healing Through Storytelling",
      description:
        "The power of narratives in shaping community and personal resilience.",
      arrow,
      date: "2025-09-01",
      category: "Lifestyle",
    },
  ];

  // ✅ Filter by category
  const filteredEpisodes =
    selectedCategory === "All"
      ? episodes
      : episodes.filter((ep) => ep.category === selectedCategory);

  // ✅ Sort
  const sortedEpisodes = [...filteredEpisodes].sort((a, b) => {
    if (selectedSort === "Newest") return new Date(b.date) - new Date(a.date);
    if (selectedSort === "Oldest") return new Date(a.date) - new Date(b.date);
    return 0; // "Popular" not implemented yet
  });

  // ✅ Spotlight = always most recent 3
  const spotlightEpisodes = [...episodes]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <section className="podcasts-overview flex-col items-center justify-center gap-3 p-20 relative bg-[#80132314] services-header podcast-header">
        <img src={Makamba} alt="Makamba Logo" />
        <header className="relative font-bold text-white text-[40px] text-center">
          Makamba Podcast by Coreal8
        </header>
        <p className="text-white font-normal">
          Conversations that spark clarity, growth, and purpose. Hosted by
          Coreal8, Makamba is where real stories, deep reflections, and
          intentional dialogue meet to guide your personal and professional
          evolution.
        </p>
      </section>

      {/* Spotlight Section */}
      <div className="spotlight">
        <h3>This Week's Spotlight</h3>
        <div className="flex w-full items-start gap-8 relative">
          {spotlightEpisodes.map((item) => (
            <article key={item.id}>
              <div className="episode-image-container relative">
                <img
                  className="w-full h-64 object-cover"
                  src={item.image}
                  alt={item.title}
                />
                <button
                  className="play-button absolute inset-0 flex items-center justify-center"
                  onClick={openWaitlist}
                >
                  <img src={play} alt="Play" className="w-12 h-12" />
                </button>
              </div>
              <div className="spotlight-text">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <img onClick={openWaitlist} src={item.arrow} alt="Arrow" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* All Episodes */}
      <div className="episode-h3">
        <h3>All Episodes</h3>
      </div>

      <HeaderSection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />

      <div className="spotlight all-episodes">
        <div className="episode-grid">
          {sortedEpisodes.map((item) => (
            <article key={item.id}>
              <div className="episode-image-container relative">
                <img
                  className="w-full h-64 object-cover"
                  src={item.image}
                  alt={item.title}
                />
                <button
                  className="play-button absolute inset-0 flex items-center justify-center"
                  onClick={openWaitlist}
                >
                  <img src={play} alt="Play" className="w-12 h-12" />
                </button>
              </div>
              <div className="spotlight-text">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <img onClick={openWaitlist} src={item.arrow} alt="Arrow" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Pagination (static for now) */}
      <div className="flex w-full pagination-num">
        <div className="pagination">
          <p>{"<"}</p>
        </div>
        <div className="pagination">
          <p>1</p>
        </div>
        <div className="pagination">
          <p>2</p>
        </div>
        <div className="pagination">
          <p>3</p>
        </div>
        <div className="pagination">
          <p>{">"}</p>
        </div>
      </div>

      {/* About Section */}
      <section className="about-makamba-container flex flex-row bg-[#DBA126] gap-[50px] text-[white] items-center about-section">
        <div className="gap-4 flex items-start about-podcast">
          <h2 className="font-black">About The Podcast</h2>
          <p>
            Makamba is a Coreal8 original podcast series that explores the
            intersections of clarity, growth, purpose, and becoming. Through
            honest conversations with thought leaders, creatives, coaches, and
            everyday changemakers, we unpack what it means to evolve —
            personally and professionally. Whether you're navigating
            transitions, rediscovering yourself, or chasing purpose, Makamba
            offers perspectives, stories, and insights to inspire your next
            step.
          </p>
          <div className="flex flex-row gap-2.5">
            <img src={Solar} alt="Solar Icon" />
            <p>
              Tune in, reflect deeply, and live more intentionally — one episode
              at a time.
            </p>
          </div>
        </div>
        <div className="makamba-img">
          <img src={MakambaBig} width="3500px" alt="Makamba Artwork" />
        </div>
      </section>

      {/* Platforms */}
      <div className="flex red-section">
        <div className="image">
          <img src={Phone} alt="Phone" />
        </div>
        <div className="red-section-right">
          <h2>Available Everywhere You Listen</h2>
          <div className="flex gap-3">
            <div className="grid-item">
              <div className="flex gap-3 items-center red-section-item">
                <img src={YouTube} className="w-14" alt="YouTube" />
                <div>
                  <p>Listen on</p>
                  <h3>YouTube</h3>
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="flex gap-3 items-center red-section-item">
                <img src={Apple} className="w-14" alt="Apple Podcasts" />
                <div>
                  <p>Listen on</p>
                  <h3>Apple Podcasts</h3>
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="flex gap-3 items-center red-section-item">
                <img src={Spotify} className="w-14" alt="Spotify" />
                <div>
                  <p>Listen on</p>
                  <h3>Spotify</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <section className="faqs-container flex-column section-container">
        <div className="section-header">
          <span>FAQs</span>
        </div>
        <div className="faqs-intro">
          <h1>Frequently Asked Questions</h1>
        </div>
        <Faqs />
      </section>

      {/* Featured Voices */}
      <section className="featured-voices flex">
        <h1>Featured Voices</h1>
        <div className="voices">
          <img src={John} alt="Featured Voice" />
          <img src={John} alt="Featured Voice" />
          <img src={John} alt="Featured Voice" />
          <img src={John} alt="Featured Voice" />
        </div>
      </section>

      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑ Back to Top
      </button>

      <Footer />
    </>
  );
};

export default Podcasts;

import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import "./Podcasts.css";
import Faqs from "./Faqs/Faqs.jsx";
import { HeaderSection } from "./HeaderSection.jsx";
import { FaAngleRight } from "react-icons/fa";
import arrow from "../../Assets/PodcastPageAssests/arrow.svg";
import play from "../../Assets/PodcastPageAssests/play.svg";
import Phone from "../../Assets/PodcastPageAssests/phone.png";
import Apple from "../../Assets/PodcastPageAssests/applepodcast.png";
import Spotify from "../../Assets/PodcastPageAssests/spotify.png";
import YouTubeLogo from "../../Assets/PodcastPageAssests/youtube.png";
import headerImage from "../../Assets/PodcastPageAssests/podcast-overview.jpg";
import MakambaBig from "../../Assets/PodcastPageAssests/about-makamba.png";
import Solar from "../../Assets/PodcastPageAssests/solar.svg";
import { useWaitlist } from "../../context/WaitListcontext.jsx";

// Episodes: You only provide YouTube URLs + category/date
// (Removed hardcoded array; episodes are loaded from public/podcasts.json)

const plans = [
  {
    planType: "Standard Sponsorship",
    price: "₦100,000",
    priceInfo: "/episode",
    planDescription:
      "Includes a 30-second ad read in one episode and a mention in the show notes.",
  },
  {
    planType: "Premium Sponsorship",
    price: "₦250,000 ",
    priceInfo: "/episode",
    planDescription:
      "Includes two 60-second ad reads, a dedicated segment in the episode, and social media promotion.",
  },
];

// 🔹 Helper to get YouTube video ID
const getYouTubeId = (url) => {
  const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
};

const Podcasts = () => {
  const { openWaitlist } = useWaitlist();
  const [episodes, setEpisodes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isPlaying, setIsPlaying] = useState({}); // track trailer play state

  const episodesPerPage = 3;

  // 🔹 Fetch episodes list from public/podcasts.json and then oEmbed details from YouTube
  useEffect(() => {
    const fetchData = async () => {
      try {
        const listRes = await fetch(`${import.meta.env.BASE_URL}podcasts.json`);
        const episodeList = await listRes.json();

        const results = await Promise.all(
          episodeList.map(async (ep) => {
            try {
              const res = await fetch(
                `https://www.youtube.com/oembed?url=${encodeURIComponent(
                  ep.url
                )}&format=json`
              );
              const data = await res.json();
              return {
                ...ep,
                title: data.title,
                thumbnail: data.thumbnail_url,
                author: data.author_name,
                description: "", // Placeholder
              };
            } catch (err) {
              console.error("Failed to fetch metadata:", err);
              return ep;
            }
          })
        );
        setEpisodes(results);
      } catch (err) {
        console.error("Failed to load /podcasts.json:", err);
      }
    };
    fetchData();
  }, []);

  // 🔹 Scroll listener for Back-to-Top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Filter by category
  const filteredEpisodes =
    selectedCategory === "All"
      ? episodes
      : episodes.filter((ep) => ep.category === selectedCategory);

  // 🔹 Sort
  const sortedEpisodes = [...filteredEpisodes].sort((a, b) => {
    if (selectedSort === "Newest") return new Date(b.date) - new Date(a.date);
    if (selectedSort === "Oldest") return new Date(a.date) - new Date(b.date);
    return 0;
  });

  // 🔹 Pagination
  const totalPages = Math.ceil(sortedEpisodes.length / episodesPerPage);
  const paginatedEpisodes = sortedEpisodes.slice(
    (currentPage - 1) * episodesPerPage,
    currentPage * episodesPerPage
  );

  // 🔹 Spotlight = always most recent 3
  const spotlightEpisodes = [...episodes]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const PlanType = ({ planType, price, priceInfo, planDescription }) => {
    return (
      <div id="session-type" className="plan-type flex-column">
        <h3>{planType}</h3>
        <h2>
          {price}
          <span className="per-session">{priceInfo}</span>
        </h2>
        <p>{planDescription}</p>
        <div className="start-plan-button">
          <button onClick={openWaitlist}>
            Get Started
            <FaAngleRight
            // style
            />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="podcasts-overview podcast-header">
        <img src={headerImage} alt="overview image" />
      </section>

      {/* Spotlight */}
      <div className="spotlight-section">
        <h3>This Week's Spotlight</h3>
        <div className="spotlight-episodes">
          {spotlightEpisodes.map((item) => {
            const videoId = getYouTubeId(item.url);
            return (
              <article key={item.id} className="spotlight-item">
                <div className="sp-top-part">
                  <div className="episode-image-container relative">
                    {!isPlaying[item.id] ? (
                      <>
                        <img
                          className="w-full h-64 object-cover"
                          src={item.thumbnail}
                          alt={item.title}
                        />
                        <button
                          className="play-button absolute inset-0 flex items-center justify-center"
                          onClick={() =>
                            setIsPlaying((prev) => ({
                              ...prev,
                              [item.id]: true,
                            }))
                          }
                        >
                          <img
                            src={play}
                            alt="Play Trailer"
                            className="w-12 h-12"
                          />
                        </button>
                      </>
                    ) : (
                      <iframe
                        width="100%"
                        height="250"
                        src={`https://www.youtube.com/embed/${videoId}?start=0&end=15&autoplay=1`}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                  <div className="spotlight-text">
                    <h2>{item.title}</h2>
                  </div>
                </div>
                <div className="link-to-yt">
                  <p>Click arrow below to watch full episode:</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <img src={arrow} alt="Watch Full Episode" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* All Episodes */}
      <div className="all-podcasts-section">
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
          <div className="episode-grid spotlight-episodes">
            {paginatedEpisodes.map((item) => (
              <article key={item.id} className="spotlight-item">
                <div className="sp-top-part">
                  <div className="episode-image-container relative">
                    <img
                      className="w-full h-64 object-cover"
                      src={item.thumbnail}
                      alt={item.title}
                    />
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="play-button absolute inset-0 flex items-center justify-center"
                    >
                      <img src={play} alt="Play" className="w-12 h-12" />
                    </a>
                  </div>
                  <div className="spotlight-text">
                    <h2>{item.title}</h2>
                  </div>
                </div>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex w-full pagination-num">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="pagination-nav custom-swiper-prev"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M6.66667 15.834C6.66667 15.2157 6.05583 14.2923 5.4375 13.5173C4.6425 12.5173 3.6925 11.6448 2.60333 10.979C1.78667 10.4798 0.796667 10.0007 0 10.0007M0 10.0007C0.796667 10.0007 1.7875 9.52148 2.60333 9.02232C3.6925 8.35565 4.6425 7.48315 5.4375 6.48482C6.05583 5.70898 6.66667 4.78398 6.66667 4.16732M0 10.0007H20"
                stroke="#0D0C12"
              />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="pagination-nav custom-swiper-next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M13.3333 4.16602C13.3333 4.78435 13.9442 5.70768 14.5625 6.48268C15.3575 7.48268 16.3075 8.35518 17.3967 9.02102C18.2133 9.52018 19.2033 9.99935 20 9.99935M20 9.99935C19.2033 9.99935 18.2125 10.4785 17.3967 10.9777C16.3075 11.6443 15.3575 12.5168 14.5625 13.5152C13.9442 14.291 13.3333 15.216 13.3333 15.8327M20 9.99935H4.76837e-07"
                stroke="#0D0C12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* About Section */}
      <section className="about-makamba-container">
        <div className="about-podcast">
          <div className="atp">
            <h2>About The Podcast</h2>
            <p>
              Makamba is a Coreal8 original podcast series that explores
              clarity, growth, purpose, and becoming. Through honest
              conversations with leaders and changemakers, it unpacks what it
              means to evolve — personally and professionally.
            </p>
          </div>
          <div className="atp-bottom">
            <img src={Solar} alt="Solar Icon" />
            <p>
              Tune in, reflect deeply, and live more intentionally — one episode
              at a time.
            </p>
          </div>
        </div>
        <div className="makamba-img">
          <img src={MakambaBig} alt="Makamba Artwork" />
        </div>
      </section>

      <section className="co-payment-options flex-column">
        <div className="copo-heading">
          <h2>Podcast Sponsorship</h2>
          <p>
            Sponsorship opportunities are available for businesses that want to
            reach our audience of professionals, entrepreneurs, and lifelong
            learners.
          </p>
        </div>
        <div className="copo-payment-plans">
          {plans.map((plan, index) => (
            <PlanType key={index} {...plan} />
          ))}
        </div>
        <div className="co-payment-info">
          <span className="info-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 17C12.2833 17 12.521 16.904 12.713 16.712C12.905 16.52 13.0007 16.2827 13 16V12C13 11.7167 12.904 11.4793 12.712 11.288C12.52 11.0967 12.2827 11.0007 12 11C11.7173 10.9993 11.48 11.0953 11.288 11.288C11.096 11.4807 11 11.718 11 12V16C11 16.2833 11.096 16.521 11.288 16.713C11.48 16.905 11.7173 17.0007 12 17ZM12 9C12.2833 9 12.521 8.904 12.713 8.712C12.905 8.52 13.0007 8.28267 13 8C12.9993 7.71733 12.9033 7.48 12.712 7.288C12.5207 7.096 12.2833 7 12 7C11.7167 7 11.4793 7.096 11.288 7.288C11.0967 7.48 11.0007 7.71733 11 8C10.9993 8.28267 11.0953 8.52033 11.288 8.713C11.4807 8.90567 11.718 9.00133 12 9ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88334 20.6867 5.825 19.9743 4.925 19.075C4.025 18.1757 3.31267 17.1173 2.788 15.9C2.26333 14.6827 2.00067 13.3827 2 12C1.99933 10.6173 2.262 9.31733 2.788 8.1C3.314 6.88267 4.02633 5.82433 4.925 4.925C5.82367 4.02567 6.882 3.31333 8.1 2.788C9.318 2.26267 10.618 2 12 2C13.382 2 14.682 2.26267 15.9 2.788C17.118 3.31333 18.1763 4.02567 19.075 4.925C19.9737 5.82433 20.6863 6.88267 21.213 8.1C21.7397 9.31733 22.002 10.6173 22 12C21.998 13.3827 21.7353 14.6827 21.212 15.9C20.6887 17.1173 19.9763 18.1757 19.075 19.075C18.1737 19.9743 17.1153 20.687 15.9 21.213C14.6847 21.739 13.3847 22.0013 12 22Z"
                fill="#801323"
              />
            </svg>
          </span>
          <div className="info-description">
            <h4>Payment Methods</h4>
            <p>
              We accept bank transfers, major credit/debit cards, online payment
              platforms like Paystack/Flutterwave.
            </p>
          </div>
          <div className="line-separator"></div>
          <div className="info-description">
            <h4>Payment is Due</h4>
            <p>At the time of service, 24 hours prior to the session.</p>
          </div>
          <div className="line-separator"></div>
          <div className="info-description">
            <h4>Cancellation Policy</h4>
            <p>
              We require 24-hour notice for cancellations or rescheduling.
              Sessions cancelled with less than 24-hour notice will be subject
              to a 50% charge. This allows us to offer the slot to other clients
              in need.
            </p>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <div className="red-section">
        <div className="rs-image">
          <img src={Phone} alt="Phone" />
        </div>
        <div className="red-section-right">
          <h2>Available Everywhere You Listen</h2>
          <div className="listening-platforms">
            <div className="grid-item">
              <div className="red-section-item">
                <img src={YouTubeLogo} className="" alt="YouTube" />
                <div>
                  <p>Listen on</p>
                  <h3>YouTube</h3>
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="flex gap-3 items-center red-section-item">
                <img src={Apple} className="" alt="Apple Podcasts" />
                <div>
                  <p>Listen on</p>
                  <h3>Apple Podcasts</h3>
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="flex gap-3 items-center red-section-item">
                <img src={Spotify} className="" alt="Spotify" />
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

export default Podcasts;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Podcast.css";
import "../../../Get-Started-btn/Get-Started-btn.css";
// import noisy from "../../Assets/noisy-world.png";
// import survival from "../../Assets/survival-strategy.png";
// import legacy from "../../Assets/legacy-img.png";
import arrow from "../../Assets/right-arrow.svg";
import makamba from "../../../../Assets/PodcastPageAssests/makambalogo-nobg.png";
import play from "../../../../Assets/PodcastPageAssests/play.svg";

import { useWaitlist } from "../../../../context/WaitListcontext.jsx";

const Podcast = () => {
  const { openWaitlist } = useWaitlist();
  const [episodes, setEpisodes] = useState([]);
  const [isPlaying, setIsPlaying] = useState({});

  // 🔹 Helper to get YouTube video ID
  const getYouTubeId = (url) => {
    const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

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

  // 🔹 Spotlight = always most recent 3
  const spotlightEpisodes = [...episodes]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const Preview = ({ img, title, album }) => {
    return (
      <div className="preview">
        <div className="preview-img">
          <img src={img} alt="" />
        </div>
        <div className="preview-writeup">
          <p>{title}</p>
          <span>{album}</span>
        </div>
        <a onClick={openWaitlist} className="session-card-img">
          <img src={arrow} alt="" />
        </a>
      </div>
    );
  };

  return (
    <div className="podcast-container">
      <div className="hp-podcast-header">
        <span>PODCAST EPISODES</span>
      </div>
      <div className="podcast-writeup">
        <div className="hp-podcast-logo">
          <img src={makamba} alt="" />
        </div>
        <h1>The Makamba Podcast</h1>
        <p>
          Conversations that spark clarity, growth, and purpose. <br /> Hosted
          by Coreal8, Makamba is where real stories, deep reflections, and
          intentional dialogue meet to guide your personal and professional
          evolution.
        </p>
      </div>
      <div className="podcasts">
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
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
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
              <div className="link-to-yt lty-homepage">
                <p>Click arrow below to watch full episode:</p>
                <a href={item.fullVideoUrl} target="_blank" rel="noopener noreferrer">
                  <img src={arrow} alt="Watch Full Episode" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="podcasts-button">
        <Link to="/podcasts">
          <button className="dark-bg-btn">Explore All Episodes</button>
        </Link>
      </div>
    </div>
  );
};

export default Podcast;

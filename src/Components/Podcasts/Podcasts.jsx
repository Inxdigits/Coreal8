import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import "./Podcasts.css";
import { EpisodeListSection } from "./EpisodeListSection.jsx";
import { FilterSection } from "./FilterSection.jsx";
import { HeaderSection } from "./HeaderSection.jsx";
import Image from "../../Assets/PodcastPageAssests/spotlight.png";
import arrow from "../../Assets/PodcastPageAssests/arrow.svg";
import play from "../../Assets/PodcastPageAssests/play.svg";
import Phone from "../../Assets/PodcastPageAssests/phone.png";
import longImage from "../../Assets/PodcastPageAssests/longImage.jpg";
import Apple from "../../Assets/PodcastPageAssests/applepodcast.png";
import Spotify from "../../Assets/PodcastPageAssests/spotify.png";
import YouTube from "../../Assets/PodcastPageAssests/youtube.png";
import John from "../../Assets/PodcastPageAssests/john.jpg";
const Podcasts = () => {
  const spotlightData = [
    {
      id: 1,
      image: Image,
      title: "Redefining Leadership in a Noisy World",
      description:
        "Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      arrow: arrow,
      hasPlayButton: false,
    },
    {
      id: 2,
      image: Image,
      title: "From Survival to Strategy",
      description:
        "Nunc vulputate libero et velit interdum,ac aliquet odio mattis.",
      arrow: arrow,
      hasP1ayButton: false,
      playlcon: play,
    },
    {
      id: 3,
      image: Image,
      title: "How to Build a Legacy That Lives After You",
      description:
        "Nunc vulputate libero et velit interdum, ac aliquet odio mattis. ",
      arrow: arrow,
      hasP1ayButton: false,
      playlcon: play,
    },
  ];

  const episodeData = [
    {
      id: 1,
      image: longImage,
      title: "Redefining Leadership in a Noisy World",
      description:
        "Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      arrow: arrow,
      hasPlayButton: false,
    },
    {
      id: 2,
      image: longImage,
      title: "From Survival to Strategy",
      description:
        "Nunc vulputate libero et velit interdum,ac aliquet odio mattis.",
      arrow: arrow,
      hasP1ayButton: false,
      playlcon: play,
    },
    {
      id: 3,
      image: longImage,
      title: "How to Build a Legacy That Lives After You",
      description:
        "Nunc vulputate libero et velit interdum, ac aliquet odio mattis. ",
      arrow: arrow,
      hasP1ayButton: false,
      playlcon: play,
    },
    {
      id: 4,
      image: longImage,
      title: "Redefining Leadership in a Noisy World",
      description:
        "Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      arrow: arrow,
      hasPlayButton: false,
    },
    {
      id: 5,
      image: longImage,
      title: "From Survival to Strategy",
      description:
        "Nunc vulputate libero et velit interdum,ac aliquet odio mattis.",
      arrow: arrow,
      hasP1ayButton: false,
      playlcon: play,
    },
    {
      id: 6,
      image: longImage,
      title: "How to Build a Legacy That Lives After You",
      description:
        "Nunc vulputate libero et velit interdum, ac aliquet odio mattis. ",
      arrow: arrow,
      hasP1ayButton: false,
      playlcon: play,
    },
  ];

  return (
    <>
      <Navbar />
      
      
      <section className=" flex-col items-center justify-center gap-3 p-20 relative bg-[#80132314] services-header">
        <header className=" relative mt-[-2.00px] [font-family: 'Montserrat-Bold', sans-serif] font-bold text-[#801323] text-[40px] text-center tracking-[0] leading-[normal]">
          The Coreal8 Podcast
        </header>
        <p>
          Explore high-impact masterclasses designed to equip you with practical
          tools for ethical leadership, lifestyle balance, and legacy creation —
          all led by Dr. Enobong Ezekiel through the Coreal8 platform.
        </p>
      </section>
      <div className="spotlight">
        <h3>This Week's Spotlight</h3>
        <div className="flex w-full items-start gap-8 relative self-stretch flex-[0_0_auto]">
          {spotlightData.map((item) => (
            <article key={item.id}>
              <div>
                <img
                  className="relative w-full h-64 object-cover"
                  src={item.image}
                />
                <div className="relative  rounded-[5px] overflow-hidden bg- [linear-gradient (Odeg, rgba (0, e, 0, 0.1 e, e. 1) _ 100%) ]">
                  {item.hasP1ayButton && (
                    <button>
                      <div>
                        <img
                          className="absolute w-5 h-[21px] top-px left-0.5"
                          alt="Play"
                          src={item.playlcon}
                        />
                      </div>
                    </button>
                  )}
                </div>
              </div>
              <div className="spotlight-text">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <img src={item.arrow} />
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="episode-h3">
   <h3>All Episodes</h3>
      </div>
   
      <HeaderSection />
  
      <div className="spotlight all-episodes">
        
        
      
        <div className="flex w-full items-start gap-8 relative self-stretch flex-[0_0_auto] episode-grid">
          {episodeData.map((item) => (
            <article key={item.id}>
              <div>
                <img
                  className="relative w-full object-cover"
                  src={item.image}
                />
                <div className="relative  rounded-[5px] overflow-hidden bg- [linear-gradient (Odeg, rgba (0, e, 0, 0.1 e, e. 1) _ 100%) ]">
                  {item.hasP1ayButton && (
                    <button>
                      <div>
                        <img
                          className="absolute w-5 h-[21px] top-px left-0.5"
                          alt="Play"
                          src={item.playlcon}
                        />
                      </div>
                    </button>
                  )}
                </div>
              </div>
              <div className="spotlight-text">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <img src={item.arrow} />
              </div>
            </article>
          ))}
        </div>
        <div className="flex w-full pagination-num">
          <div className="pagination">
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66667 11.834C6.66667 11.2157 6.05583 10.2923 5.4375 9.51732C4.6425 8.51732 3.6925 7.64482 2.60333 6.97898C1.78667 6.47982 0.796667 6.00065 0 6.00065M0 6.00065C0.796667 6.00065 1.7875 5.52148 2.60333 5.02232C3.6925 4.35565 4.6425 3.48315 5.4375 2.48482C6.05583 1.70898 6.66667 0.783984 6.66667 0.167317M0 6.00065L20 6.00065"
                stroke="#0D0C12"
              />
            </svg>
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
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3333 4.16602C13.3333 4.78435 13.9442 5.70768 14.5625 6.48268C15.3575 7.48268 16.3075 8.35518 17.3967 9.02102C18.2133 9.52018 19.2033 9.99935 20 9.99935M20 9.99935C19.2033 9.99935 18.2125 10.4785 17.3967 10.9777C16.3075 11.6443 15.3575 12.5168 14.5625 13.5152C13.9442 14.291 13.3333 15.216 13.3333 15.8327M20 9.99935H4.76837e-07"
                stroke="#0D0C12"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex red-section">
        <div className="image">
          <img src={Phone} />
        </div>
        <div className="red-section-right">
          <h2>Available Everywhere You Listen</h2>
          <div className="app-grid">
            <div className="grid-item">
              <div className="flex gap-3 items-center red-section-item">
                <img src={Apple} className="w-14" />
                <div>
                  <div>
                    <p>Listen on</p>
                    <h3>Apple Podcasts</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="flex gap-3 items-center red-section-item">
                <img src={Apple} className="w-14" />
                <div>
                  <div>
                    <p>Listen on</p>
                    <h3>Apple Podcasts</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="flex gap-3 items-center red-section-item">
                <img src={Spotify} className="w-14" />
                <div>
                  <div>
                    <p>Listen on</p>
                    <h3>Spotify</h3>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className=" app-grid">
            
            <div className="grid-item">
              <div className="flex gap-3 items-center  red-section-item">
                <img src={YouTube} className="w-14" />
                <div>
                  <div>
                    <p>Listen on</p>
                    <h3>Youtube</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="flex gap-3 items-center  red-section-item">
                <img src={Spotify} className="w-14" />
                <div>
                  <div>
                    <p>Listen on</p>
                    <h3>Spotify</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="flex gap-3 items-center red-section-item">
                <img src={YouTube} className="w-14" />
                <div>
                  <div>
                    <p>Listen on</p>
                    <h3>Youtube</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="featured-voices flex">
        <h1>Featured Voices</h1>

        <div className="voices flex">
          <img src={John} />
          <img src={John} />
          <img src={John} />
          <img src={John} />
        </div>
      </section>
      <Footer />
    </>
  );
};
export default Podcasts;

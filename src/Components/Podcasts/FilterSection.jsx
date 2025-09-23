import React from "react";
import Image from "../../Assets/PodcastPageAssests/spotlight.png";
import arrow from "../../Assets/PodcastPageAssests/arrow.svg";
import play from "../../Assets/PodcastPageAssests/play.svg";
import Phone from "../../Assets/PodcastPageAssests/phone.png";
import longImage from "../../Assets/PodcastPageAssests/longImage.jpg";

export const FilterSection = () => {
  const podcasts = [
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
      subtitle: "A Journey of Personal Growth",
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
      subtitle: null,
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
      subtitle: "A Deep Dive into Modern Leadership",
      description:
        "Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      arrow: arrow,
      hasPlayButton: false,
    },
    {
      id: 5,
      image: longImage,
      title: "From Survival to Strategy",
      subtitle: "A Journey of Personal Growth",
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
      subtitle: null,
      description:
        "Nunc vulputate libero et velit interdum, ac aliquet odio mattis. ",
      arrow: arrow,
      hasP1ayButton: false,
      playlcon: play,
    },
  ];
  return (
    <section role="region" aria-label="Featured Articles">
      {podcasts.map((podcast) => (
        <article key={podcast.id}>
          <div>
            <img className="relative w-full object-cover" src={podcast.image} />
            <div className="relative  rounded-[5px] overflow-hidden bg- [linear-gradient (Odeg, rgba (0, e, 0, 0.1 e, e. 1) _ 100%) ]">
              {podcast.hasP1ayButton && (
                <button>
                  <div>
                    <img
                      className="absolute w-5 h-[21px] top-px left-0.5"
                      alt="Play"
                      src={podcast.playlcon}
                    />
                  </div>
                </button>
              )}
            </div>
          </div>
          <div className="spotlight-text">
            <h2>{podcast.title}</h2>
            <p>{podcast.description}</p>
            <img src={podcast.arrow} />
          </div>
        </article>
      ))}
    </section>
  );
};

import React from 'react';
import './Podcast.css';
import '../../../Get-Started-btn/Get-Started-btn.css';
import noisy from "../../Assets/noisy-world.png";
import survival from "../../Assets/survival-strategy.png";
import legacy from "../../Assets/legacy-img.png";
import arrow from '../../Assets/right-arrow.svg';

const Podcast = () => {
  const episodes = [
      {
          img: noisy,
          title: "Redefining Leadership in a Noisy World"
      },
      {
          img: survival,
          title: "From Survival to Strategy",
          album: "- Beyond the Boardroom"
      },
      {
          img: legacy,
          title: "How to Build a Legacy That Lives After You"
      }
      
  ]

  const Preview = ({img, title, album}) => {
      return (
        <div className="preview">
          <div className="preview-img">
            <img src={img} alt="" />
          </div>
          <div className="preview-writeup">
            <p>{title}</p>
            <span>{album}</span>
          </div>
          <a>
            <img src={arrow} alt="" />
          </a>
        </div>
      );
  };

  return (
    <div className="podcast-container">
      <div className="podcast-header">
        <span>PODCAST EPISODES</span>
      </div>
      <div className="podcast-writeup">
        <h1>The Coreal8 Podcast</h1>
        <p>
          Dive into real, powerful conversations with visionary leaders,
          entrepreneurs, and changemakers across Africa and beyond. Dr. Ezekiel
          brings clarity, wisdom, and courage to the table in every episode.
        </p>
      </div>
      <div className="podcasts">
        {episodes.map((episode, index) => (
            <Preview key={index} {...episode} />
        ))}
      </div>
      <div className="podcasts-button">
        <button className="dark-bg-btn">Explore All Episodes</button>
      </div>
    </div>
  );
}

export default Podcast

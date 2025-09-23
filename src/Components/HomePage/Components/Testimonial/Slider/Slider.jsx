import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import quoteIcon from "../../../Assets/icon-quote.svg";
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";

const testimonials = [
  {
    quote:
      "One of my best sessions was the Mentees' Presentation where all mentees gave a presentation of their assignments. It was such an eye-opener as the uniqueness of everyone was on display.",
    name: "Abigail Oyewole",
    // role: "Tech Founder",
  },
  {
    quote:
      "Not everyday you find a mentor able to read you like a book, patiently walk you through strengthening your weak areas, and pour into you without holding back. The intentionality, depth and openness of Dr Enobong is something to be studied.",
    name: "Onome",
    // role: "NGO Lead",
  },
  {
    quote:
      "My session with you was truly transformative and empowering. I have been able to recognize and channel my strengths in a more positive and strategic way toward building my dream. Your guidance has helped me align my passion with purpose, and since then, I've taken bold steps, one of which includes initiating meetings with NGO leaders for potential collaboration, connection, and impactful networking.",
    name: "Basirat Aderoju Sulaimon-Sholaja nee Akorede",
    // role: "Podcaster",
  },
  {
    quote:
      "Your coaching session was truly transformative. I valued the safe and supportive space you created, which allowed me to be open and vulnerable. The clarity I gained on managing myself, aligning work expectations, and navigating relationships has been invaluable.",
    name: "Anonymous",
    // role: "Podcaster",
  },
];

const MySlider = () => {
  return (
    <div className="testimonial-slider-container">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-swiper-next",
          prevEl: ".custom-swiper-prev",
        }}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <div className="quote-mark">
                <img src={quoteIcon} alt="Quote icon" />
              </div>
              <blockquote className="testimonial-quote">“{t.quote}”</blockquote>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <p>{t.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-nav">
        <button
          className="custom-swiper-prev"
          aria-label="Previous testimonial"
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
        <button className="custom-swiper-next" aria-label="Next testimonial">
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
  );
};

export default MySlider;

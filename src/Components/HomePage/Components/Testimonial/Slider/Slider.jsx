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
      "Working with Dr. Ezekiel changed the way I lead my team and my life.",
    name: "Chidi N.",
    role: "Tech Founder",
  },
  {
    quote:
      "Our partnership has been transformational for our community programs.",
    name: "Amaka O.",
    role: "NGO Lead",
  },
  {
    quote: "Dr. Ezekiel's input made our podcast shine.",
    name: "Tunde F.",
    role: "Podcaster",
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
          ←
        </button>
        <button className="custom-swiper-next" aria-label="Next testimonial">
          →
        </button>
      </div>
    </div>
  );
};

export default MySlider;

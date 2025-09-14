import React from "react";
import "./CoursesSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import stars from "../../../Assets/CoursesPageAssets/fivestar.svg";
import author from "../../../Assets/CoursesPageAssets/author-pic.png";

const testimonials = [
  {
    quote:
      "Working with Dr. Ezekiel changed the way I lead my team and my life.",
    name: "Chidi N.",
    role: "Tech Founder",
  },
  {
    quote: "This course reshaped how I lead my business and my team.",
    name: "Amaka O.",
    role: "NGO Lead",
  },
  {
    quote: "Dr. Ezekiel's input made our podcast shine.",
    name: "Tunde F.",
    role: "Podcaster",
  },
  {
    quote:
      "Working with Dr. Ezekiel changed the way I lead my team and my life.",
    name: "Chidi N.",
    role: "Tech Founder",
  },
  {
    quote: "This course reshaped how I lead my business and my team.",
    name: "Amaka O.",
    role: "NGO Lead",
  },
  {
    quote: "Dr. Ezekiel's input made our podcast shine.",
    name: "Tunde F.",
    role: "Podcaster",
  }
];

const CoursesSlider = () => {
  return (
    <div className="ct-slider-container flex-column">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={3}
        navigation={{
          nextEl: ".custom-swiper-next",
          prevEl: ".custom-swiper-prev",
        }}
        breakpoints={{
          1275: {
            slidesPerView: 3.5,
          },
          955: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1.5,
          },
          0: {
            slidesPerView: 1,
          },
        }}
        loop={true}
        speed={700}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="ct-card">
              <div className="testimonial-author ct-author">
                <div className="author-pic">
                  <img src={author} alt={`Photo of ${t.name}`} />
                </div>
                <div className="author">
                  <strong>{t.name}</strong>
                  <p>{t.role}</p>
                  <img
                    src={stars}
                    alt="5 star rating"
                    className="review-stars"
                  />
                </div>
              </div>
              <p className="ct-card-quote">“{t.quote}”</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-nav ct-custom-nav">
        <button className="custom-swiper-prev" aria-label="Previous slide">
          ←
        </button>
        <button className="custom-swiper-next" aria-label="Next slide">
          →
        </button>
      </div>
    </div>
  );
};

export default CoursesSlider;

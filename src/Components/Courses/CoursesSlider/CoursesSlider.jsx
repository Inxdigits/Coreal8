import React from 'react';
import './CoursesSlider.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import stars from '../../../Assets/CoursesPageAssets/fivestar.svg';
import author from "../../../Assets/CoursesPageAssets/author-pic.png";

const CoursesSlider = () => {
    const testimonials = [
      {
        quote:
          "Working with Dr. Ezekiel changed the way I lead my team and my life.",
        name: "Chidi N.",
        role: "Tech Founder",
      },
      {
        quote:
          "“This course reshaped how I lead my business and my team.”",
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
        quote:
          "“This course reshaped how I lead my business and my team.”",
        name: "Amaka O.",
        role: "NGO Lead",
      },
      {
        quote: "Dr. Ezekiel's input made our podcast shine.",
        name: "Tunde F.",
        role: "Podcaster",
      },
    ];
  return (
    <div className="ct-slider-container flex-column">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={3.5}
        navigation={{
          nextEl: ".custom-swiper-next",
          prevEl: ".custom-swiper-prev",
        }}
        //   pagination={{ clickable: true }}
        //   onSlideChange={() => console.log("slide changed")}
        //   onSwiper={(swiper) => console.log(swiper)}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card ct-card">
              <div className="testimonial-author ct-author">
                <div className="author-pic">
                  <img src={author} alt={testimonial.name} />
                </div>
                <div className="author">
                  <strong>{testimonial.name}</strong>
                  <p>{testimonial.role}</p>
                  <img src={stars} className="review-stars" />
                </div>
              </div>
              <p className='ct-card-quote'>"{testimonial.quote}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-nav ct-custom-nav">
        <button className="custom-swiper-prev">←</button>
        <button className="custom-swiper-next">→</button>
      </div>
    </div>
  );
}

export default CoursesSlider

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import quoteIcon from '../../../Assets/icon-quote.svg';
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";

const MySlider = () => {
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

  return (
    <div className="testimonial-slider-container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
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
            <div className="testimonial-card">
              <div className="quote-mark">
                <img src={quoteIcon} alt="" />
              </div>
              <h2>{testimonial.quote}</h2>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <p>{testimonial.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-nav">
        <button className="custom-swiper-prev">←</button>
        <button className="custom-swiper-next">→</button>
      </div>
    </div>
  );
};

export default MySlider;

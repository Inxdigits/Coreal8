import React, { useState, useEffect } from "react";
import "./Cartpage.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CartMechanism from "./CartMechanism/CartMechanism.jsx";
import CartPayment from "./CartPayment.jsx";
import { Link } from "react-router-dom";
import course1 from "../../Assets/CoursesPageAssets/courses/strategic-leader.png";
import course2 from "../../Assets/CoursesPageAssets/courses/modern-people-management.jpg";
import course3 from "../../Assets/CoursesPageAssets/courses/culture-transformation.jpg";
// import course4 from "../../Assets/CoursesPageAssets/courses/cx-mastery.jpg";
// import course5 from "../../Assets/CoursesPageAssets/courses/sni-fundamentals.png";
// import course6 from "../../Assets/CoursesPageAssets/courses/performance-management-reimagined.jpg";
// import course7 from "../../Assets/CoursesPageAssets/courses/cpm.jpg";
import openicon from "../HomePage/Assets/open-icon.svg";

import { useWaitlist } from "../../context/WaitListcontext.jsx";

const CartPage = () => {
  const { openWaitlist } = useWaitlist();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showBackToTop, setShowBackToTop] = useState();

  // 🔹 Scroll listener for Back-to-Top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
      {
        /* Back to Top */
      }
      {
        showBackToTop && (
          <button
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ↑ Back to Top
          </button>
        );
      }

  // Track screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageMap = {
    1: course1,
    2: course2,
    3: course3,
    4: course3
  };

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}courses.json`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error loading courses:", err))
      .finally(() => setLoading(false));
  }, []);

  const CourseCard = ({ id, title, writeup, price, category }) => {
    return (
      <article className="courses-card">
        <div className="courses-card-top">
          <div className="course-card-image">
            <img src={imageMap[id]} alt={title} />
            <span className="category">{category}</span>
          </div>
          <div className="courses-preview-writeup">
            <p>{title}</p>
            <span>{writeup}</span>
          </div>
        </div>

        <div className="courses-card-bottom">
          <span className="course-price">₦{price}</span>
          <Link
            onClick={openWaitlist}
            className="view-course-link"
            aria-label={`View ${title} course`}
          >
            View Course
            <img src={openicon} alt="open" />
          </Link>
        </div>
      </article>
    );
  };


  // Slice courses: show all on desktop, only first 3 on mobile unless 4th is specifically allowed
  const displayedCourses = isMobile ? courses.slice(0, 4) : courses.slice(0, 3);

  const [cartItems, setCartItems] = useState([
    // {
    //   id: 1,
    //   title: "The Visionary Leader's Blueprint",
    //   price: 45000,
    //   quantity: 1,
    //   image: course1,
    // },
    // {
    //   id: 2,
    //   title: "The Visionary Leader's Blueprint",
    //   price: 45000,
    //   quantity: 1,
    //   image: course2,
    // },
    // {
    //   id: 3,
    //   title: "The Visionary Leader's Blueprint",
    //   price: 45000,
    //   quantity: 1,
    //   image: course3,
    // },
    // {
    //   id: 4,
    //   title: "The Visionary Leader's Blueprint",
    //   price: 45000,
    //   quantity: 1,
    //   image: course2,
    // },
    // {
    //   id: 5,
    //   title: "The Visionary Leader's Blueprint",
    //   price: 45000,
    //   quantity: 1,
    //   image: course3,
    // },
    // {
    //   id: 1,
    //   title: "The Visionary Leader's Blueprint",
    //   price: 45000,
    //   quantity: 1,
    //   image: course1,
    // },
    // {
    //   id: 2,
    //   title: "The Visionary Leader's Blueprint",
    //   price: 45000,
    //   quantity: 1,
    //   image: course2,
    // },
    // {
    //   id: 3,
    //   title: "The Visionary Leader's Blueprint",
    //   price: 45000,
    //   quantity: 1,
    //   image: course3,
    // },
    // {
    //   id: 4,
    //   title: "The Visionary Leader's Blueprint",
    //   price: 45000,
    //   quantity: 1,
    //   image: course2,
    // },
    // {
    //   id: 5,
    //   title: "The Visionary Leader's Blueprint",
    //   price: 45000,
    //   quantity: 1,
    //   image: course3,
    // },
  ]);

  const [arrayLength, setArrayLength] = useState(cartItems.length);

  useEffect(() => {
    setArrayLength(cartItems.length);
  }, [cartItems]);

  // helper functions
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="cartpage">
      <Navbar />
      <div className="cartpage-container">
        <section className="cart-intro">
          <div className="cart-intro-text">
            <h2>Cart</h2>
            <span>You have {arrayLength} Cart Items</span>
          </div>
          {/* <div className="gradient-button-container ci-btn-container">
            <button onClick={openWaitlist} className="gradient-button ci-btn">
              Add to Cart
            </button>
          </div> */}
        </section>

        <section className="cartmain">
          <CartMechanism
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            clearCart={clearCart}
          />
          <div className="cartpayment">
            <CartPayment cartItems={cartItems} />
          </div>
        </section>

        <section className="show-courses">
          <h3>Show Courses</h3>
          <div className="courses">
            {displayedCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </section>
      </div>

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
    </div>
  );
};

export default CartPage;
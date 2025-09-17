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
import openicon from "../HomePage/Assets/open-icon.svg";

import { useWaitlist } from "../../context/WaitListcontext.jsx";

const CartPage = () => {
  const { openWaitlist } = useWaitlist();

  const courses = [
    {
      img: course1,
      title: "The Visionary Leader's Blueprint",
      writeup:
        "Learn how to lead with clarity, courage, and conviction in today’s dynamic world.",
    },
    {
      img: course2,
      title: "The Visionary Leader's Blueprint",
      writeup:
        "Learn how to lead with clarity, courage, and conviction in today’s dynamic world.",
    },
    {
      img: course3,
      title: "The Visionary Leader's Blueprint",
      writeup:
        "Learn how to lead with clarity, courage, and conviction in today’s dynamic world.",
    },
  ];
  const CourseCard = ({ img, title, writeup }) => {
    return (
      <div className="courses-preview">
        {" "}
        <div className="courses-preview-img">
          {" "}
          <img src={img} alt="" />{" "}
        </div>{" "}
        <div className="courses-preview-writeup">
          {" "}
          <p>{title}</p> <span>{writeup}</span>{" "}
        </div>{" "}
        <div className="courses-card-bottom">
          {" "}
          <span>₦45,000</span>{" "}
          <Link onClick={openWaitlist} className="view-course-link">
            {" "}
            View course <img src={openicon} />{" "}
          </Link>{" "}
        </div>{" "}
      </div>
    );
  };

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Visionary Leader's Blueprint",
      price: 45000,
      quantity: 1,
      image: course1,
    },
    {
      id: 2,
      title: "The Visionary Leader's Blueprint",
      price: 45000,
      quantity: 1,
      image: course2,
    },
    {
      id: 3,
      title: "The Visionary Leader's Blueprint",
      price: 45000,
      quantity: 1,
      image: course3,
    },
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
          <div className="gradient-button-container ci-btn-container">
            <button onClick={openWaitlist} className="gradient-button ci-btn">
              Add to Cart
            </button>
          </div>
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
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
            <div className="courses-preview extra-courses-preview">
              <div className="courses-preview-img">
                <img src={course1} alt="" />
              </div>
              <div className="courses-preview-writeup">
                <p>The Visionary Leader's Blueprint</p>
                <span>
                  Learn how to lead with clarity, courage, and conviction in
                  today’s dynamic world.
                </span>
              </div>
              <div className="courses-card-bottom">
                <span>₦45,000</span>
                <Link to="/courses" className="view-course-link">
                  View course
                  <img src={openicon} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑ Back to Top
      </button>

      <Footer />
    </div>
  );
};

export default CartPage;

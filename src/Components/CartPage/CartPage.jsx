import React, {useState} from 'react';
import './Cartpage.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import CartMechanism from './CartMechanism/CartMechanism.jsx';
import CartPayment from './CartPayment.jsx';
import { Link } from "react-router-dom";
import course1 from "../HomePage/Assets/first-course.png";
import course2 from '../HomePage/Assets/second-course.png';
import course3 from '../HomePage/Assets/third-course.png';
import openicon from '../HomePage/Assets/open-icon.svg';

const CartPage = () => {
  const [arrayLength, setArrayLength] = useState(0);

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
    }
  ];
  
  const CourseCard = ({ img, title, writeup }) => {
    return (
      <div className="courses-preview">
        <div className="courses-preview-img">
          <img src={img} alt="" />
        </div>
        <div className="courses-preview-writeup">
          <p>{title}</p>
          <span>{writeup}</span>
        </div>
        <div className="courses-card-bottom">
          <span>₦45,000</span>
          <Link to="/contact" className="view-course-link">
            View course
            <img src={openicon} />
          </Link>
        </div>
      </div>
    );
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
                  <button className="gradient-button ci-btn">
                    Add to Cart
                  </button>
                </div>
            </section>
            <section className="cartmain">
              <CartMechanism setArrayLength={setArrayLength} />
              <CartPayment />
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
      <Footer />
    </div>
  )
}

export default CartPage

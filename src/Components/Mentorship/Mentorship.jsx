import React from "react";
import "./Mentorship.css";
import coachImage from "../../Assets/MnCPageAssets/coaching-img.png";
import Faqs from "./Faqs/Faqs.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Journey } from "./Journey.jsx";
import { Pathways } from "./Pathways.jsx";
import { FaAngleRight } from "react-icons/fa";
import { useWaitlist } from "../../context/WaitListcontext.jsx";

const Mentorship = () => {
  const { openWaitlist } = useWaitlist();

  const plans = [
    {
      planType: "Single Session",
      price: "₦50,000 - ₦70,000",
      priceInfo: "/hour",
      planDescription:
        "A one-hour, one-on-one session with a certified coach or mentor. This is ideal for addressing a specific challenge or getting initial guidance.",
    },
    {
      planType: "3-Sessions Package",
      price: "₦60,000 - ₦135,000 ",
      priceInfo: "(10% discount)",
      planDescription:
        "Commit to a longer-term plan for a discounted rate and more structured support.",
    },
    {
      planType: "6-Sessions Package",
      price: "₦95,000 - ₦240,000",
      priceInfo: "(15% discount)",
      planDescription:
        "Commit to a longer-term plan for a discounted rate and more structured support.",
    },
    {
      planType: "Annual Mentorship",
      price: "₦500,000 - ₦1,000,000",
      priceInfo: "/year",
      planDescription:
        "A long-term, ongoing relationship with a dedicated mentor, including monthly sessions and email support.",
    },
    // {
    //   planType: "Initial Consultation",
    //   price: "₦120,000",
    // },
  ];

  const PlanType = ({ planType, price, priceInfo, planDescription }) => {
    return (
      <div id="session-type" className="plan-type flex-column">
        <h3>{planType}</h3>
        <h2>
          {price}
          <span className="per-session">{priceInfo}</span>
        </h2>
        <p>{planDescription}</p>
        <div className="start-plan-button">
          <button onClick={openWaitlist}>
            Get Started
            <FaAngleRight
            // style
            />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <section className="mnc-overview">
        <header className="">
          Ignite Your Potential: Strategic Mentorship & Coaching
        </header>
        <p>
          At Coreal8, we believe in empowering individuals and leaders to
          accelerate their growth, achieve specific goals, and unlock their full
          potential. Our mentorship and coaching programs offer personalized
          guidance, actionable strategies, and unwavering support to propel you
          forward.
        </p>
      </section>

      <Pathways />
      <Journey />

      <section className="individual-section fp-section">
        <div className="individual">
          <h1>Flexible Programs, Lasting Impact</h1>
          <p>
            We offer flexible program structures to accommodate your schedule
            and accelerate your progress.
          </p>
          <ul className="booking-writeup-list">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clipPath="url(#clip0_1499_5002)">
                  <path
                    d="M8 0C3.58175 0 0 3.58175 0 8C0 12.4185 3.58175 16 8 16C12.4185 16 16 12.4185 16 8C16 3.58175 12.4185 0 8 0ZM8 15.0157C4.14025 15.0157 1 11.8597 1 7.99997C1 4.14022 4.14025 0.999969 8 0.999969C11.8597 0.999969 15 4.14023 15 7.99997C15 11.8597 11.8597 15.0157 8 15.0157ZM11.1927 5.07275L6.49898 9.796L4.38523 7.68225C4.18998 7.487 3.87348 7.487 3.67798 7.68225C3.48273 7.8775 3.48273 8.194 3.67798 8.38925L6.15273 10.8643C6.34798 11.0592 6.66448 11.0592 6.85998 10.8643C6.88248 10.8418 6.90175 10.8172 6.91925 10.7917L11.9003 5.77998C12.0953 5.58473 12.0953 5.26823 11.9003 5.07275C11.7048 4.8775 11.3883 4.8775 11.1927 5.07275Z"
                    fill="#319F43"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1499_5002">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <div className="list-text">
                <p>
                  Accelerated Growth: 3-month program (ideal for specific,
                  short-term goals)
                </p>
              </div>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clipPath="url(#clip0_1499_5002)">
                  <path
                    d="M8 0C3.58175 0 0 3.58175 0 8C0 12.4185 3.58175 16 8 16C12.4185 16 16 12.4185 16 8C16 3.58175 12.4185 0 8 0ZM8 15.0157C4.14025 15.0157 1 11.8597 1 7.99997C1 4.14022 4.14025 0.999969 8 0.999969C11.8597 0.999969 15 4.14023 15 7.99997C15 11.8597 11.8597 15.0157 8 15.0157ZM11.1927 5.07275L6.49898 9.796L4.38523 7.68225C4.18998 7.487 3.87348 7.487 3.67798 7.68225C3.48273 7.8775 3.48273 8.194 3.67798 8.38925L6.15273 10.8643C6.34798 11.0592 6.66448 11.0592 6.85998 10.8643C6.88248 10.8418 6.90175 10.8172 6.91925 10.7917L11.9003 5.77998C12.0953 5.58473 12.0953 5.26823 11.9003 5.07275C11.7048 4.8775 11.3883 4.8775 11.1927 5.07275Z"
                    fill="#319F43"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1499_5002">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <div className="list-text">
                <p>
                  Sustainable Transformation: 6-month program (most popular for
                  comprehensive development)
                </p>
              </div>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clipPath="url(#clip0_1499_5002)">
                  <path
                    d="M8 0C3.58175 0 0 3.58175 0 8C0 12.4185 3.58175 16 8 16C12.4185 16 16 12.4185 16 8C16 3.58175 12.4185 0 8 0ZM8 15.0157C4.14025 15.0157 1 11.8597 1 7.99997C1 4.14022 4.14025 0.999969 8 0.999969C11.8597 0.999969 15 4.14023 15 7.99997C15 11.8597 11.8597 15.0157 8 15.0157ZM11.1927 5.07275L6.49898 9.796L4.38523 7.68225C4.18998 7.487 3.87348 7.487 3.67798 7.68225C3.48273 7.8775 3.48273 8.194 3.67798 8.38925L6.15273 10.8643C6.34798 11.0592 6.66448 11.0592 6.85998 10.8643C6.88248 10.8418 6.90175 10.8172 6.91925 10.7917L11.9003 5.77998C12.0953 5.58473 12.0953 5.26823 11.9003 5.07275C11.7048 4.8775 11.3883 4.8775 11.1927 5.07275Z"
                    fill="#319F43"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1499_5002">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <div className="list-text">
                <p>
                  Long-Term Mentorship: 12-month engagements (for ongoing
                  strategic support and evolution)
                </p>
              </div>
            </li>
          </ul>
          <div className="individual-flex">
            <p>
              Session Frequency:
              <span className="normal-subtext">
                {" "}
                Most programs include 2 dedicated 60-minute sessions per month.
                Additional check-ins and support via email/messaging as agreed
                upon in your plan.
              </span>
            </p>
          </div>
        </div>
        <div className="counseling-image">
          <img
            className="counseling-image"
            src={coachImage}
            alt="coach Image"
          />
        </div>
      </section>
      <section className="co-payment-options flex-column">
        <div className="copo-heading">
          <h2>Investing in Your Growth: Our Program Fees</h2>
          <p>
            Our mentorship and coaching services are designed for personalized
            support and are offered on a session or package basis
          </p>
        </div>
        <div id="session-types" className="copo-payment-plans">
          {plans.map((plan, index) => (
            <PlanType key={index} {...plan} />
          ))}
        </div>
        <div className="co-payment-info">
          <span className="info-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 17C12.2833 17 12.521 16.904 12.713 16.712C12.905 16.52 13.0007 16.2827 13 16V12C13 11.7167 12.904 11.4793 12.712 11.288C12.52 11.0967 12.2827 11.0007 12 11C11.7173 10.9993 11.48 11.0953 11.288 11.288C11.096 11.4807 11 11.718 11 12V16C11 16.2833 11.096 16.521 11.288 16.713C11.48 16.905 11.7173 17.0007 12 17ZM12 9C12.2833 9 12.521 8.904 12.713 8.712C12.905 8.52 13.0007 8.28267 13 8C12.9993 7.71733 12.9033 7.48 12.712 7.288C12.5207 7.096 12.2833 7 12 7C11.7167 7 11.4793 7.096 11.288 7.288C11.0967 7.48 11.0007 7.71733 11 8C10.9993 8.28267 11.0953 8.52033 11.288 8.713C11.4807 8.90567 11.718 9.00133 12 9ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88334 20.6867 5.825 19.9743 4.925 19.075C4.025 18.1757 3.31267 17.1173 2.788 15.9C2.26333 14.6827 2.00067 13.3827 2 12C1.99933 10.6173 2.262 9.31733 2.788 8.1C3.314 6.88267 4.02633 5.82433 4.925 4.925C5.82367 4.02567 6.882 3.31333 8.1 2.788C9.318 2.26267 10.618 2 12 2C13.382 2 14.682 2.26267 15.9 2.788C17.118 3.31333 18.1763 4.02567 19.075 4.925C19.9737 5.82433 20.6863 6.88267 21.213 8.1C21.7397 9.31733 22.002 10.6173 22 12C21.998 13.3827 21.7353 14.6827 21.212 15.9C20.6887 17.1173 19.9763 18.1757 19.075 19.075C18.1737 19.9743 17.1153 20.687 15.9 21.213C14.6847 21.739 13.3847 22.0013 12 22Z"
                fill="#801323"
              />
            </svg>
          </span>
          <div className="info-description">
            <h4>Payment Methods</h4>
            <p>
              We accept bank transfers, major credit/debit cards, online payment
              platforms like Paystack/Flutterwave.
            </p>
          </div>
          <div className="line-separator"></div>
          <div className="info-description">
            <h4>Payment is Due</h4>
            <p>At the time of service, 24 hours prior to the session.</p>
          </div>
          <div className="line-separator"></div>
          <div className="info-description">
            <h4>Cancellation Policy</h4>
            <p>
              We require 24-hour notice for cancellations or rescheduling.
              Sessions cancelled with less than 24-hour notice will be subject
              to a 50% charge. This allows us to offer the slot to other clients
              in need.
              We require 24-hour notice for cancellations or rescheduling.
              Sessions cancelled with less than 24-hour notice will be subject
              to a 50% charge. This allows us to offer the slot to other clients
              in need.
            </p>
          </div>
        </div>
      </section>
        <section className="counselling-faqs faqs-container flex-column section-container">
          <div className="section-header">
            <span>FAQs</span>
          </div>
          <div className="faqs-intro">
            <h1>Frequently Asked Questions</h1>
          </div>
          <Faqs />
        </section>
        
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑ Back to Top
        </button>

      <Footer />
    </>
  );
};

export default Mentorship;


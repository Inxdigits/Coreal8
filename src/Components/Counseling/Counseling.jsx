import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Counseling.css";
import Faqs from "./Faqs/Faqs.jsx";
import approachImg from "../../Assets/approachImg.png";
import couples from "../HomePage/Assets/couples-counseling.png";
import family from "../HomePage/Assets/family-counseling.png";
import individual from "../HomePage/Assets/individual-counseling.png";
import bookingImg from "../../Assets/bookCounselingImage.png";
import { FaAngleRight } from "react-icons/fa";
import { useWaitlist } from "../../context/WaitListcontext";



  const sessions = [
    {
      icon: individual,
      header: "Individual Counselling",
      body: "This one-on-one therapy focuses on personal growth, emotional regulation, stress management, anxiety, depression, grief, trauma, and navigating life transitions. We provide a safe space for self-discovery and developing coping mechanisms.",
    },
    {
      icon: couples,
      header: "Grief & Loss Counselling",
      body: "Provides compassionate support for individuals experiencing bereavement, helping them process loss, cope with emotions, and find ways to heal and adapt to life after loss.",
    },
    {
      icon: family,
      header: "Stress & Anxiety Management",
      body: "Focuses on practical strategies and therapeutic techniques to manage overwhelming stress, reduce anxiety symptoms, and develop healthier coping mechanisms for daily life.",
    },
    {
      icon: family,
      header: "Trauma-Informed Counselling",
      body: "Offers a safe and sensitive approach to processing past traumatic experiences, helping clients heal, regain a sense of safety, and restore emotional well-being.",
    },
  ];

  const SessionCard = ({ icon, header, body }) => {
    return (
      <div className="about-card counseling-support-card">
        <div className="support-card-img">
          <img src={icon} alt="" />
        </div>
        <div className="session-card-text support-card-text">
          <h2>{header}</h2>
          <p>{body}</p>
        </div>
      </div>
    );
  };

  const plans = [
    {
      planType: "Individual Counselling",
      price: "₦100,000-₦120,000",
      planDescription: "Sessions designed for more than one person.",
    },
    {
      planType: "Couples/Group Counselling",
      price: "₦100,000-₦120,000",
      planDescription:
        "A confidential 50-minute session with a licensed counselor.",
    },
    // {
    //   planType: "Initial Consultation",
    //   price: "₦120,000",
    // },
  ];

const Counseling = () => {
  const { openWaitlist } = useWaitlist();

  const PlanType = ({ planType, price, planDescription }) => {
    return (
      <div className="plan-type flex-column">
        <h3>{planType}</h3>
        <h2>
          {price}
          <span className="per-session">/per session</span>
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
    <div className="counseling-container">
      <Navbar />
      <div className="counseling-main">
        <section className="counseling-overview">
          <div className="counseling-overview-writeup">
            <h1>Your Path to Well-being Starts Here</h1>
            <p>
              At Coreal8, we offer a supportive and confidential space where you
              can explore challenges, gain clarity, and develop effective
              strategies for a more fulfilling life. Our personalized approach
              ensures you receive the care tailored to your unique journey.
            </p>
          </div>
        </section>
        <section className="counseling-approach flex-column">
          <div className="counseling-approach-writeup">
            <h2>Our Counselling Approach</h2>
            <p>
              We blend empathy, professionalism, and strategy to help you
              navigate life’s complexities. Whether you're facing anxiety,
              grief, trauma, or transitions, we’re here for you.
            </p>
          </div>
          <div className="approach-image">
            <img src={approachImg} alt="approach" />
          </div>
        </section>
        <section className="counseling-support flex-column">
          <div className="counseling-support-writeup">
            <h2>Specialized Support for your Unique Needs</h2>
            <p>
              We provide a range of counselling services designed to address
              various concerns, fostering resilience, self-awareness, and
              emotional well-being.
            </p>
          </div>
          <div className="support">
            {sessions.map((session, index) => (
              <SessionCard key={index} {...session} />
            ))}
          </div>
        </section>
        <section className="book-counseling flex-column">
          <div className="booking-main">
            <div className="booking-writeup">
              <div className="booking-writeup-heading">
                <h2>Ready to Begin? Booking Your Session is Simple.</h2>
                <p>
                  We aim to make accessing support as easy as possible. Follow
                  these steps to schedule your confidential session with a
                  Coreal8 counselor:
                </p>
              </div>
              <ul className="booking-writeup-list">
                <li>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="10" height="10" rx="5" fill="white" />
                  </svg>

                  <div className="list-text">
                    <h3>Initial Inquiry</h3>
                    <p>
                      Fill out our brief online contact form or call us
                      directly. This helps us understand your needs and match
                      you with the best fit.
                    </p>
                  </div>
                </li>
                <li>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="10" height="10" rx="5" fill="white" />
                  </svg>

                  <div className="list-text">
                    <h3>Complimentary Consultation</h3>
                    <p>
                      We offer a brief [10-minute] complimentary phone
                      consultation to discuss your needs, answer any questions,
                      and ensure we're the right fit for you.
                    </p>
                  </div>
                </li>
                <li>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="10" height="10" rx="5" fill="white" />
                  </svg>

                  <div className="list-text">
                    <h3>Schedule Your Session</h3>
                    <p>
                      Once aligned, we will help you schedule your first
                      appointment at a time that works for you, either virtually
                      or in-person at our office.
                    </p>
                  </div>
                </li>
                <li>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="10" height="10" rx="5" fill="white" />
                  </svg>

                  <div className="list-text">
                    <h3>Secure Client Portal</h3>
                    <p>
                      Prior to your first session, you will receive access to
                      our secure client portal to complete necessary intake
                      forms privately.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="booking-button gradient-button-container">
                <button onClick={openWaitlist} className="gradient-button">
                  Book Your Session Today
                </button>
              </div>
            </div>
            <div className="booking-image">
              <img src={bookingImg} alt="booking image" />
            </div>
          </div>
        </section>
        <section className="co-payment-options flex-column">
          <div className="copo-heading">
            <h2>Transparent Fees & Payment Options</h2>
            <p>
              Our counseling services are provided by licensed professionals and
              are priced to be accessible while reflecting the value of expert
              support.
            </p>
          </div>
          <div className="copo-payment-plans">
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
                We accept bank transfers, major credit/debit cards, online
                payment platforms like Paystack/Flutterwave.
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
                to a 50% charge. This allows us to offer the slot to other
                clients in need.
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

export default Counseling;

import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Counseling.css';
import approachImg from '../../Assets/approachImg.png';
import couples from "../HomePage/Assets/couples-counseling.png";
import family from "../HomePage/Assets/family-counseling.png";
import individual from '../HomePage/Assets/individual-counseling.png';
import bookingImg from '../../Assets/bookCounselingImage.png';

const Counseling = () => {
  const sessions = [
    {
      icon: individual,
      header: "Individual Counseling",
      body: "This one-on-one therapy focuses on personal growth, emotional regulation, stress management, anxiety, depression, grief, trauma, and navigating life transitions. We provide a safe space for self-discovery and developing coping mechanisms.",
    },
    {
      icon: couples,
      header: "Grief & Loss Counseling",
      body: "Provides compassionate support for individuals experiencing bereavement, helping them process loss, cope with emotions, and find ways to heal and adapt to life after loss.",
    },
    {
      icon: family,
      header: "Stress & Anxiety Management",
      body: "Focuses on practical strategies and therapeutic techniques to manage overwhelming stress, reduce anxiety symptoms, and develop healthier coping mechanisms for daily life.",
    },
    {
      icon: family,
      header: "Trauma-Informed Counseling",
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
      planType: "Individual Counseling",
      price: "₦120,000",
    },
    {
      planType: "Group Counseling",
      price: "₦150,000",
    },
    {
      planType: "Initial Consultation",
      price: "₦120,000",
    },
  ];

  const PlanType = ({planType, price}) => {
    return (
      <div className="plan-type">
        <h3>{planType}</h3>
        <h2>{price}
          <span>/per session</span>
        </h2>
        <p>60-minutes</p>
      </div>
    );
  }

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
            <h2>Our Counseling Approach</h2>
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
              We provide a range of counseling services designed to address
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
                <h2>Ready to Begin? Your Booking is Simple.</h2>
                <p>
                  We aim to make accessing support as easy as possible. Follow
                  these steps to schedule your confidential session with a
                  Coreal8 counselor:
                </p>
              </div>
              <ul className="booking-writeup-list">
                <li>
                  <h3>Initial Inquiry</h3>
                  <p>
                    Fill out our brief online contact form or call us directly.
                    This helps us understand your needs and match you with the
                    best fit.
                  </p>
                </li>
                <li>
                  <h3>Complimentary Consultation</h3>
                  <p>
                    We offer a brief [10-minute] complimentary phone
                    consultation to discuss your needs, answer any questions,
                    and ensure we're the right fit for you.
                  </p>
                </li>
                <li>
                  <h3>Schedule Your Session</h3>
                  <p>
                    Once aligned, we will help you schedule your first
                    appointment at a time that works for you, either virtually
                    or in-person at our office.
                  </p>
                </li>
                <li>
                  <h3>Secure Client Portal</h3>
                  <p>
                    Prior to your first session, you will receive access to our
                    secure client portal to complete necessary intake forms
                    privately.
                  </p>
                </li>
              </ul>
            </div>
            <div className="booking-image">
              <img src={bookingImg} alt="booking image" />
            </div>
          </div>
          <div className="booking-button gradient-button-container">
            <button className="gradient-button">Book Your Session Today</button>
          </div>
        </section>
        <section className="co-payment-options">
          <div className="copo-heading">
            <h2>Transparent Fees & Payment Options</h2>
            <p>
              We believe in clear and straightforward pricing for our
              high-quality counseling services. Our fee structure is as follows:
            </p>
          </div>
          <div className="copo-payment-plans">
            {plans.map((index, plan) => (
              <PlanType key={index} {...plan} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Counseling

import React from "react";
import "./Mentorship.css"; // Import the CSS file for styling
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Journey } from "./Journey.jsx";
import { Pathways } from "./Pathways.jsx";
import { FaAngleRight } from "react-icons/fa";

import { useWaitlist } from "../../context/WaitListcontext.jsx";

const { openWaitlist } = useWaitlist();

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

const PlanType = ({ planType, price }) => {
  return (
    <div className="plan-type flex-column ">
      <h3 className="text-[#801323] plan-text">{planType}</h3>
      <h2>
        {price}
        <span className="per-session">/per session</span>
      </h2>
      <p>60-minutes</p>
      <div className="start-plan-button">
        <button onClick={openWaitlist}>
          Get Started
          <FaAngleRight
            // style
            color="#801323"
          />
        </button>
      </div>
    </div>
  );
};

const Mentorship = () => {
    return (
        <>
        <Navbar />
        <div className="page-content">
          <section className="f1ex flex-col items-center justify-center gap-3 p-20 relative bg-[#80132314] services-header">
        <header className="w-[800px] relative [font-family: 'Montserrat-Bold', sans-serif] font-bold text-[#801323] text-[40px] text-center tracking-[0] leading-[normal]">
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

       <section className="co-payment-options flex-column">
          <div className="copo-heading">
            <h2>Transparent Fees & Payment Options</h2>
            <p>
              We believe in clear and straightforward pricing for our
              high-quality counseling services. <br /> Our fee structure is as follows:
            </p>
          </div>
          <div className="copo-payment-plans">
            {plans.map((plan, index) => (
              <PlanType key={index} {...plan} />
            ))}
          </div>
          <div className="co-payment-info">
            <span className="info-icon info-con">i</span>
            <h4>Payment Methods</h4>
            <p>
              We accept bank transfers, major credit/debit cards, online payment
              platforms like Paystack/Flutterwave.
            </p>
            <div className="line-separator"></div>
            <h4>Payment is Due</h4>
            <p>At the time of service, 24 hours prior to the session.</p>
            <div className="line-separator"></div>
            <h4>Cancellation Policy</h4>
            <p>
              We require 24-hour notice for cancellations
              or rescheduling. Sessions cancelled with less than 24-hour notice
              will be subject to a 50% charge. This allows us to offer the slot
              to other clients in need.
            </p>
          </div>
        </section>
        </div>
      <Footer/>
        </>
    )
}

export default Mentorship;

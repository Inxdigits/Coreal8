import React from "react";
import "./ServicePage.css"; // Import the CSS file for styling
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import serviceOne from "../../Assets/ServicePageAssets/service-one.png";
import serviceTwo from "../../Assets/ServicePageAssets/service-two.png";
import serviceThree from "../../Assets/ServicePageAssets/service-three.png";
import { Link } from "react-router-dom";
import { useWaitlist } from "../../context/WaitListcontext.jsx";

const ServicePage = () => {
  const { openWaitlist } = useWaitlist();

  return (
    <div>
      <Navbar />
      <section className="f1ex flex-col items-center justify-center gap-3 p-20 relative bg-[#80132314] services-header">
        <header className=" relative mt-[-2.00px] [font-family: 'Montserrat-Bold', sans-serif] font-bold text-[#801323] text-[40px] text-center tracking-[0] leading-[normal]">
          Our Services
        </header>
        <p>
          At Coreal8, our services are designed around three core areas of
          impact: empowering individuals through counseling, guiding
          organizations with strategic consulting and training, and helping
          professionals amplify their presence through personal brand
          development. Wherever you are in your journey, there’s a path designed
          for you.
        </p>
      </section>
      <section className="individual-section">
        <div className="individual">
          <h1>Individual Counseling & Engagement</h1>
          <p>
            Support for Your Mental & Emotional Well-being
            <br />
            <br />
            Work with licensed professionals to navigate life transitions,
            anxiety, trauma, grief, or self-discovery. Our approach is
            compassionate, confidential, and centered around your personal
            goals.
          </p>
          <div className="individual-flex">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6654 5L7.4987 14.1667L3.33203 10"
                stroke="#801323"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>Individuals seeking mental/emotional clarity;</p>
          </div>

          <div className="tile-grid">
            <div className="tile">
              <p>Individual Conselling</p>
            </div>
            <div className="tile">
              <p>Grief Counseling</p>
            </div>
            <div className="tile">
              <p>Trauma Therapy</p>
            </div>
            <div className="tile">
              <p>Stress Management</p>
            </div>
          </div>
          <div className="spacer"></div>
          <div className="btns-flex">
            <div className="red-btn">
              <Link to="/counselling">Explore Counseling Services</Link>
            </div>
            <div className="white-btn">
              <Link onClick={openWaitlist}>
                Book a free 20 mins Consultation Call
              </Link>
            </div>
          </div>
        </div>
        <div className="counseling-image">
          <img className="counseling-image" src={serviceOne} alt="" />
        </div>
      </section>

      <section className="individual-section consulting-section">
        <div className="counseling-image">
          <img className="counseling-image" src={serviceTwo} alt="" />
        </div>
        <div className="consulting individual">
          <h1>Corporate Consulting & Training</h1>
          <p>
            Build High-Performing Teams & Resilient Workplaces
            <br />
            <br />
            We help organizations thrive through customized training, leadership
            development, and strategic team solutions that enhance culture,
            performance, and collaboration.
          </p>
          <div className="individual-flex">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6654 5L7.4987 14.1667L3.33203 10"
                stroke="#801323"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>For - HR teams, companies, leaders;</p>
          </div>

          <div className="tile-grid">
            <div className="tile">
              <p>Leadership Coaching</p>
            </div>
            <div className="tile">
              <p>Team Training</p>
            </div>
            <div className="tile">
              <p>Communication Skills</p>
            </div>
            <div className="tile">
              <p>Culture Alignment</p>
            </div>
          </div>
          <div className="spacer"></div>
          <div className="btns-flex c-btns-flex">
            <div className="red-btn">
              <Link to="/mentoring">View Mentorship & Coaching Programs</Link>
            </div>
            <div className="white-btn">
              <Link onClick={openWaitlist}>
                Book a free 20 mins Consultation Call
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className=" individual-section">
        <div className="individual">
          <h1>Personal Brand Development</h1>
          <p>
            Support for Your Mental & Emotional Well-being
            <br />
            <br />
            Our personal branding services empower you to define your message,
            increase your visibility, and become a recognized voice in your
            field — through coaching, storytelling, and digital presence.
          </p>
          <div className="individual-flex">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6654 5L7.4987 14.1667L3.33203 10"
                stroke="#801323"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>Professionals, entrepreneurs, speakers, creators</p>
          </div>

          <div className="tile-grid">
            <div className="tile">
              <p>Personal Brand Coaching</p>
            </div>
            <div className="tile">
              <p>Communication & Influence Workshops</p>
            </div>
          </div>
          <div className="spacer"></div>
          <div className="btns-flex">
            <div className="red-btn">
              <Link to="/mentoring">Discover Coaching Programs</Link>
            </div>
            <div className="white-btn">
              <Link onClick={openWaitlist}>
                Book a free 20 mins Consultation Call
              </Link>
            </div>
          </div>
        </div>
        <div className="counseling-image">
          <img className="counseling-image" src={serviceThree} alt="" />
        </div>
      </section>

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

export default ServicePage;

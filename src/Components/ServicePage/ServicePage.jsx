import React from "react";
import "./ServicePage.css"; // Import the CSS file for styling
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import Image from "../../Assets/ServicePageAssets/image.jpg";

const ServicePage = () => {
  // const counselingServices = [
  //   "Individual Counseling",
  //   "Grief Counseling",
  //   "Trauma Therapy",
  //   "Stress Management",
  // ];

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
      <section className=" individual-section">
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
            <div className="tiles">
              <p>Individual Conselling</p>
            </div>
            <div className="tiles">
              <p>Grief Counseling</p>
            </div>
            <div className="tiles">
              <p>Trauma Therapy</p>
            </div>
            <div className="tiles">
              <p>Stress Management</p>
            </div>
          </div>
          <div className="individual-flex  btn-flex">
            <div className="red-btn">
              <p>Explore Counseling Services</p>
            </div>
            <div className="white-btn">
              <p>Book a Counseling Session</p>
            </div>
          </div>
        </div>
        <div className="counseling-image">
          <img className="counseling-image" src={Image} alt="" />
        </div>
      </section>

      <section className=" consulting-section">
        <div className="counseling-image">
          <img className="counseling-image" src={Image} alt="" />
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
            <div className="tiles">
              <p>Leadership Coaching</p>
            </div>
            <div className="tiles">
              <p>Team Training</p>
            </div>
            <div className="tiles">
              <p>Communication Skills</p>
            </div>
            <div className="tiles">
              <p>Culture Alignment</p>
            </div>
          </div>
          <div className="btn-flex">
            <div className="red-btn">
              <p>View Mentorship & Coaching Programs</p>
            </div>
            <div className="yellow-btn">
              <p>Book a Discovery Call</p>
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
            <div className="tiles">
              <p>Personal Brand Coaching</p>
            </div>
            <div className="tiles">
              <p>Communication & Influence Workshops</p>
            </div>
          </div>
          <div className="spacer"></div>
          <div className="btn-flex">
            <div className="red-btn">
              <p>Discover Coaching Programs</p>
            </div>
            <div className="white-btn">
              <p>Book Brand Strategy Session</p>
            </div>
          </div>
        </div>
        <div className="counseling-image">
          <img className="counseling-image" src={Image} alt="" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePage;

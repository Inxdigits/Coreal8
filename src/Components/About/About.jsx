import React, { useState, useEffect } from "react";
import "./About.css";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import branding from "./branding.svg";
import organization from "./organization.svg";
import individual from "./individual.svg";
import logoBg from "../../Assets/logo-background.svg";
// import johnDoe from "../../Assets/john-doe.png";
// import juliusDoe from "../../Assets/AboutPageAssets/julius-doe.png";
// import janetDoe from "../../Assets/AboutPageAssets/janet-doe.png";
// import julietDoe from "../../Assets/AboutPageAssets/juliet-doe.png";
// import joyDoe from "../../Assets/AboutPageAssets/joy-doe.png";

import empowerment from "./empowerment.svg";
import integrity from "./integrity.svg";
import excellence from "./excellence.svg";
import empathy from "./empathy.svg";
import growth from "./growth.svg";
import authenticity from "./authenticity.svg";

const About = () => {
  const [showBackToTop, setShowBackToTop] = useState();

  // 🔹 Scroll listener for Back-to-Top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sessions = [
    {
      icon: individual,
      header: "For the Individual",
      body: "We provide personalized counselling and engagement solutions designed to foster self-awareness, resilience, and personal growth. We walk 	alongside you as you discover your unique strengths and navigate 	life's complexities.",
    },
    {
      icon: organization,
      header: "For the Organization",
      body: "We drive organizational success through tailored corporate consulting and impactful training programs. Our solutions are crafted to enhance team dynamics, leadership capabilities, and overall business performance, creating workplaces where innovation and collaboration thrive.",
    },
    {
      icon: branding,
      header: "For Personal Branding",
      body: "We guide you in building and showcasing your authentic personal brand. Through platforms like podcasts, blogs, and strategic brand showcases, we empower you to amplify your unique voice and establish a lasting, meaningful influence in your field.",
    },
  ];

  const SessionCard = ({ icon, header, body }) => {
    return (
      <div className="about-card">
        <div className="session-card-img support-card-img">
          <img src={icon} alt="" />
        </div>
        <div className="session-card-text about-card-text">
          <h2>{header}</h2>
          <p>{body}</p>
        </div>
      </div>
    );
  };

  const values = [
    {
      icon: empowerment,
      coreValue: "Empowerment",
      valueDesc:
        "We believe in fostering inner strength and providing the tools for individuals and organizations to realize their full potential and take control of their own narratives.",
    },
    {
      icon: integrity,
      coreValue: "Integrity",
      valueDesc:
        "We operate with unwavering honesty, transparency, and ethical conduct in all our interactions, building trust and fostering genuine connections.",
    },
    {
      icon: excellence,
      coreValue: "Excellence",
      valueDesc:
        "We are dedicated to delivering the highest quality of service, continuously learning, innovating, and striving for optimal outcomes in every solution we provide.",
    },
    {
      icon: empathy,
      coreValue: "Empathy",
      valueDesc:
        "We approach every client with deep understanding, respect, and compassion, recognizing and valuing their unique experiences and perspectives.",
    },
    {
      icon: growth,
      coreValue: "Growth",
      valueDesc:
        "We champion continuous learning, adaptability, and evolution, inspiring both our clients and ourselves to embrace challenges as opportunities for progress",
    },
    {
      icon: authenticity,
      coreValue: "Authenticity",
      valueDesc:
        "We encourage genuine self-expression and support the development of true-to-self brands and interactions, both personally and professionally.",
    },
  ];

  const ValueCard = ({ icon, coreValue, valueDesc }) => {
    return (
      <div className="value-card">
        <div className="session-card-img support-card-img">
          <img src={icon} alt="" />
        </div>
        <div>
          <h3>{coreValue}</h3>
          <p>{valueDesc}</p>
        </div>
      </div>
    );
  };

  // const teamMembers = [
  //   {
  //     picture: johnDoe,
  //     name: "John Doe",
  //     role: "Strategic Consultant",
  //   },
  //   {
  //     picture: juliusDoe,
  //     name: "Julius Doe",
  //     role: "Strategic Consultant",
  //   },
  //   {
  //     picture: janetDoe,
  //     name: "Janet Doe",
  //     role: "Strategic Consultant",
  //   },
  //   {
  //     picture: julietDoe,
  //     name: "Juliet Doe",
  //     role: "Strategic Consultant",
  //   },
  //   {
  //     picture: joyDoe,
  //     name: "Joy Doe",
  //     role: "Strategic Consultant",
  //   },
  // ];

  // const TeamMember = ({ picture, name, role }) => {
  //   return (
  //     <div className="member">
  //       <div className="member-img">
  //         <img src={picture} alt={name} />
  //       </div>
  //       <p>{name}</p>
  //       <span>{role}</span>
  //     </div>
  //   );
  // };

  return (
    <div className="About-Page">
      <Navbar />
      <div className="page-content">
        <div className="about-container">
          <section className="about-coreal8">
            <div className="ac-writeup">
              <h1>About Coreal8</h1>
              <p>
                At Coreal8, we believe in the profound power of self-discovery
                and strategic growth. Our foundational philosophy, captured in
                our driving purpose - Empowering Minds, Shaping Futures -
                reflects our commitment to fostering well-being, success, and
                authentic influence at every level.
                <br />
                <br />
                We are a pioneering firm dedicated to unlocking potential,
                whether it's through the journey of individual transformation or
                the strategic evolution of an entire organization. We understand
                that true growth begins within and radiates outward, impacting
                personal lives, professional environments, and broader
                communities
              </p>
            </div>
            <div className="ac-image">
              <img
                src="https://res.cloudinary.com/dklslzrkg/image/upload/v1759692191/about-coreal8_zup51q.png"
                alt=""
              />
            </div>
          </section>
          <section className="coreal8-expertise flex-column">
            <div className="expertise-text">
              <h2>Coreal8 offers a distinctive blend of expertise</h2>
              <p>
                At Coreal8, we are more than just service providers; we are your
                dedicated partners in growth. We are passionate about creating
                pathways to deeper understanding, sustainable success, and a
                future shaped by empowered minds.
              </p>
            </div>
            <div className="services expertise">
              {sessions.map((session, index) => (
                <SessionCard key={index} {...session} />
              ))}
            </div>
          </section>
          <section className="mission-vision">
            <div className="mv-image">
              <img
                src="https://res.cloudinary.com/dklslzrkg/image/upload/v1759692315/hands-together_anmk9d.png"
                alt=""
              />
            </div>
            <div className="mv-writeup">
              <div className="mission">
                <h3>Our Mission</h3>
                <p>
                  Our mission at Coreal8 is to provide innovative, empathetic,
                  and results-driven solutions that empower individuals to
                  achieve personal well-being and influence, and enable
                  organizations to foster high-performing, resilient
                  environments. We achieve this by delivering expert
                  counselling, strategic consulting, transformative training,
                  and robust personal brand development services.
                </p>
              </div>
              <div className="vision">
                <h3>Our Vision</h3>
                <p>
                  Coreal8 envisions a world where every individual and
                  organization is equipped with the mental fortitude, strategic
                  insights, and authentic voice necessary to navigate
                  challenges, seize opportunities, and shape a future defined by
                  purpose and positive impact. We aspire to be the leading
                  partner in holistic human and organizational development.
                </p>
              </div>
            </div>
          </section>
          <section className="core-values flex-column">
            <div className="cv-writeup">
              <h2>Our Core Values</h2>
              <p>
                Our work at Coreal8 is guided by a steadfast commitment to these
                core values
              </p>
            </div>
            <div className="values services">
              {values.map((coreValue, index) => (
                <ValueCard key={index} {...coreValue} />
              ))}
            </div>
          </section>
          <section className="our-story-section">
            <div className="story-section-left">
              <div className="story-text">
                <h2>Our Story</h2>
                <p>
                  Coreal8 was founded on the belief that personal well-being and
                  organizational success are deeply interconnected. Born from
                  The personal journey of its founder, Dr Enobong Ezekiel who
                  recognized the profound impact of tailored support on
                  overcoming life's hurdles, and a passion to bridge the gap
                  between individual potential and corporate performance.
                </p>
                <h4>June 2025</h4>
                <p>
                  Since our inception in June 2025 we emerge as a comprehensive
                  solution provider, driven by a growing understanding of the
                  holistic needs of our clients. Our journey has been marked by
                  a commitment to innovation and a relentless pursuit of
                  empowering our clients to define and achieve their own
                  versions of success.
                </p>
              </div>
              <img src={logoBg} alt="" className="ourstory-bg-logo" />
            </div>
            <div className="story-section-mid">
              <img
                src="https://res.cloudinary.com/dklslzrkg/image/upload/v1759763436/story-pic_oo9cly.png"
                alt=""
              />
            </div>
          </section>
          {/* <section className="our-team-section flex-column">
            <div className="our-team-writeup">
              <h3>Our Team</h3>
              <p>
                The strength of Coreal8 lies in our diverse and dedicated team
                of experts. Comprising seasoned counselors, strategic
                consultants, experienced trainers, and personal branding
                specialists, each member brings a wealth of knowledge, empathy,
                and practical experience to our clients. We are united by a
                shared passion for human development and a collaborative
                approach that ensures every solution is tailored, impactful, and
                delivered with genuine care. We are committed to continuous
                professional development, ensuring we remain at the forefront of
                best practices in all our service areas.
              </p>
            </div>
            <div className="team-members">
              {teamMembers.map((teamMember, index) => (
                <TeamMember key={index} {...teamMember} />
              ))}
            </div>
          </section> */}
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
    </div>
  );
};

export default About;

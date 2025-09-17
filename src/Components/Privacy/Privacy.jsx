import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Privacy.css";

const Privacy = () => {
  const [activeSection, setActiveSection] = useState(
    "1. Information We Collect"
  );

  const navigationItems = [
    { id: 1, title: "1. Information We Collect" },
    { id: 2, title: "2. How We Use Your Information" },
    { id: 3, title: "3. Sharing Your Information" },
    { id: 4, title: "4. Your Rights and Choices" },
    { id: 5, title: "5. Data Security" },
    { id: 6, title: "6. Changes to This Policy" },
    { id: 7, title: "7. Contact Us" },
  ];

  const contentSections = {
    "1. Information We Collect": {
      title: "Information We Collect",
      content: `
We collect information to provide and improve our Services to you. The types of personal information we may collect include:

•   Personal Identifiable Information (PII): This includes your name, email address, phone number, and mailing address when you register for a course, sign up for a newsletter, or contact us.
•   Account Information: Your username, password, and other information related to your account.
•   Payment Information: If you make a purchase, we collect payment details such as credit card numbers and billing addresses. This information is processed by our secure third-party payment processors. We do not store your full payment card details on our servers.
•   Usage Data: Information about how you use our Services, such as pages visited, time spent on the site, courses enrolled in, and interactions with our content.
•   Device and Log Information: Information your browser or device automatically sends, including your IP address, browser type, operating system, and unique device identifiers.
•   User-Generated Content: Any content you create and share on our platform, such as comments, feedback, or forum posts.`,
    },
    "2. How We Use Your Information": {
      title: "How We Use Your Information",
      content: `
We use your personal information for purposes such as:

• Processing transactions and managing course enrollments.  
• Communicating about your account, course updates, and offers (if opted in).  
• Personalizing your experience and recommending content.  
• Analyzing and improving Services.  
• Complying with legal obligations.  
• Securing Services and preventing fraud.`,
    },
    "3. Sharing Your Information": {
      title: "Sharing Your Information",
      content: `
We do not sell your information. We may share it only:

• With Service Providers (payment, hosting, analytics).  
• When legally required (court orders, subpoenas).  
• In business transfers (mergers, acquisitions).  
• With your explicit consent.`,
    },
    "4. Your Rights and Choices": {
      title: "Your Rights and Choices",
      content: `
Depending on your location, you may have rights such as:

• Access and correction of personal information.  
• Requesting deletion (with some legal exceptions).  
• Opting out of promotional emails via unsubscribe links.`,
    },
    "5. Data Security": {
      title: "Data Security",
      content: `
We use administrative, technical, and physical safeguards to protect your information. However, no method of transmission over the Internet is 100% secure.`,
    },
    "6. Changes to This Policy": {
      title: "Changes to This Policy",
      content: `
We may update this Privacy Policy from time to time. Significant changes will be communicated via our website or direct notice.`,
    },
    "7. Contact Us": {
      title: "Contact Us",
      content: `
If you have any questions about this Privacy Policy, contact us at:

📧 support@coreal8.com  
📍 Lagos, Nigeria`,
    },
  };

  // scroll to top when section changes
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [activeSection]);

  return (
    <>
      <Navbar />

      <section className="privacy-header">
        <header className="privacy-header-inner">
          <h1>Privacy Policy</h1>
          <p>
            This Privacy Policy describes how Coreal8 Limited ("Coreal8," "we,"
            "us," or "our") collects, uses, and shares your personal information
            when you use our Services.
          </p>
          <p className="last-updated">Last Updated: August 8th, 2025</p>
        </header>
      </section>

      <section className="privacy-content">
        <aside
          className="privacy-nav"
          role="navigation"
          aria-label="Privacy policy sections"
        >
          <ul>
            {navigationItems.map((item) => (
              <li
                key={item.id}
                className={item.title === activeSection ? "active" : ""}
              >
                <button
                  onClick={() => setActiveSection(item.title)}
                  aria-current={
                    item.title === activeSection ? "page" : undefined
                  }
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <article className="privacy-info" aria-labelledby="content-heading">
          <h2 id="content-heading">{contentSections[activeSection]?.title}</h2>
          <div className="privacy-text">
            {contentSections[activeSection]?.content
              .split("\n")
              .map((para, idx) => (
                <p key={idx}>{para.trim()}</p>
              ))}
          </div>
        </article>
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

export default Privacy;

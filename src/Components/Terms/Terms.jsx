import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Terms = () => {
  const [activeSection, setActiveSection] = useState(
      "1. Use of Services"
    );
  
    const navigationItems = [
      { id: 1, title: "1. Use of Services" },
      { id: 2, title: "2. Intellectual Property" },
      { id: 3, title: "3. Payments and Refunds" },
      { id: 4, title: "4. Disclaimers and Limitation of Liability" },
      { id: 5, title: "5. Termination" },
      { id: 6, title: "6. Governing Law" },
      { id: 7, title: "7. Changes to these Terms" },
      { id: 8, title: "8. Contact Information" },
    ];
  
    const contentSections = {
      "1. Use of Services": {
        title: "Use of Services",
        content: `
  • Eligibility: You must be at least 18 years old to use our Services. By using our Services, you represent that you are of legal age.

•   Account: You are responsible for maintaining the confidentiality of your account password and are liable for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.

•   Prohibited Conduct: You agree not to use our Services for any illegal or unauthorized purpose, including but not limited to:

        -  Violating any applicable laws or regulations.
        -  Infringing upon the intellectual property rights of others.
        - Harassing, abusing, or threatening others.
        - Uploading viruses or other malicious code.`,
      },
      "2. Intellectual Property": {
        title: "Intellectual Property",
        content: `
  • Our Content: All content on our website and within our courses, including text, graphics, logos, and course materials, is the intellectual property of Coreal8 Limited or its licensors and is protected by copyright and other intellectual property laws.
• Your License: When you purchase a course, you are granted a limited, non-exclusive, non-transferable license to access and use the course materials for your personal, non-commercial use only.
• Prohibitions: You may not copy, reproduce, distribute, or create derivative works from any part of our Services without our express written permission.`,
      },
      "3. Payments and Refunds": {
        title: "Payments and Refunds",
        content: `
  • Pricing: All prices for our courses and Services are in [Currency, e.g., USD, NGN] and are subject to change without notice.
• Payment: We use third-party payment processors to handle all transactions securely.
• Refunds: Our refund policy is as follows: Full refunds are available within 10 days of purchase, provided the user has not completed more than 20% of the course content. All refund requests must be submitted in writing.`,
      },
      "4. Disclaimers and Limitation of Liability": {
        title: "Disclaimers and Limitation of Liability",
        content: `
  • "As Is" Basis: Our Services are provided on an "as is" and "as available" basis without any warranties of any kind, whether express or implied.
• No Guarantee of Results: We do not guarantee any specific results or outcomes from using our Services, including career advancement or business success.
• Limitation of Liability: To the maximum extent permitted by law, Coreal8 Limited and its directors, employees, and affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Services.`,
      },
      "5. Termination": {
        title: "Termination",
        content: `
We reserve the right to suspend or terminate your access to our Services at our sole discretion, without prior notice, for any reason, including but not limited to a breach of these Terms.`,
      },
      "6. Governing Law": {
        title: "Governing Law",
        content: `
  These Terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.`,
      },
      "7. Changes to these Terms": {
        title: "Changes to these Terms",
        content: `
  We may revise these Terms from time to time. The most current version will be posted on our website. Your continued use of the Services after the changes become effective constitutes your acceptance of the new Terms`,
      },
      "8. Contact Information": {
        title: "Contact Information",
        content: `If you have any questions about these Terms of Service, please contact us at:
• Email: Corea8ng@gmail.com 
• Address: 20 Oluseun Crescent, Corona School Estate, Anthony/Gbagada`,
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
            <h1>Terms of Use</h1>
            <p>
              Please read these Terms of Service ("Terms") carefully before
              using the Services offered by Coreal8 Limited ("Coreal8," "we,"
              "us," or "our"). By accessing or using our Services, you agree to
              be bound by these Terms.
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
            <h2 id="content-heading">
              {contentSections[activeSection]?.title}
            </h2>
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
}

export default Terms

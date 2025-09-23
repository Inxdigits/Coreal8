import React, { useState } from "react";
import "./Trust.css";
import "../../Reuse.css";
import PartnerModal from "./PartnerModal/PartnerModal";
import SubmitModal from "./PartnerModal/SubmitModal";
import HealthcareIcon from "./SVGs/HealthcareIcon.svg";
import HRIcon from "./SVGs/HRIcon.svg";
import IndustryIcon from "./SVGs/IndustryIcon.svg";
import MediaIcon from "./SVGs/MediaIcon.svg";
import CreatorsIcon from "./SVGs/CreatorsIcon.svg";
import OrganizationsIcon from "./SVGs/OrganizationsIcon.svg";

const Trust = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSubmitted, setIsModalSubmitted] = useState(false);

  const partners = [
    {
      icon: HealthcareIcon,
      header: "Healthcare Providers & Clinics",
      body: "We work with trusted wellness centers to ensure holistic support through referrals and collaboration.",
    },
    {
      icon: HRIcon,
      header: "HR Departments & EAPs",
      body: "Partnering with HR teams to provide counselling and wellness programs for employee growth.",
    },
    {
      icon: IndustryIcon,
      header: "Industry Associations",
      body: "We deliver training and speak at events, helping professionals and organizations grow together.",
    },
    {
      icon: MediaIcon,
      header: "Media Outlets & Podcasters",
      body: "Sharing expert insights through collaborative content and interviews that amplify our message.",
    },
    {
      icon: CreatorsIcon,
      header: "Personal Brand Creators",
      body: "We work with photographers, marketers, and web developers to elevate your personal brand journey.",
    },
    {
      icon: OrganizationsIcon,
      header: "Community Organizations",
      body: "Collaborating with NGOs and youth groups to offer workshops, support groups, and outreach programs.",
    },
  ];

  const Partner = ({ icon, header, body }) => (
    <div className="card">
      <div className="session-card-img partner-card-img">
        <img src={icon} alt="" />
      </div>
      <div className="partner-card-text">
        <h2>{header}</h2>
        <p>{body}</p>
      </div>
    </div>
  );

  return (
    <div className="trust-container">
      <div className="partner-writeup">
        <h1>Our Strategic Partnerships</h1>
        <p>
          We collaborate with trusted organizations and professionals to enhance
          the value we deliver across counselling, corporate training, and
          personal branding.
        </p>
      </div>
      <div className="partners">
        {partners.map((partner, index) => (
          <Partner key={index} {...partner} />
        ))}
      </div>
      <div className="partner-button-container">
        <button className="partner-button" onClick={() => setIsModalOpen(true)}>
          Become a Partner
        </button>
      </div>

      {/* Partner Form Modal */}
      <PartnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={() => setIsModalSubmitted(true)}
      />

      {/* Success Modal */}
      <SubmitModal
        isOpen={isModalSubmitted}
        onClose={() => setIsModalSubmitted(false)}
      />
    </div>
  );
};

export default Trust;

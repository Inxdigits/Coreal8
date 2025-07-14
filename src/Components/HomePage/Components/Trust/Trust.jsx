import React from 'react';
import './Trust.css';
import '../../Reuse.css'
import couples from "../../Assets/couples-counseling.png";
import family from "../../Assets/family-counseling.png";
import individual from '../../Assets/individual-counseling.png';

const Trust = () => {
  const partners = [
    {
      icon: individual,
      header: "Healthcare Providers & Clinics",
      body: "We work with trusted wellness centers to ensure holistic support through referrals and collaboration."
    },
    {
      icon: couples,
      header: "HR Departments & EAPs",
      body: "Partnering with HR teams to provide counseling and wellness programs for employee growth."
    },
    {
      icon: family,
      header: "Industry Associations",
      body: "We deliver training and speak at events, helping professionals and organizations grow together."
    },
    {
      icon: individual,
      header: "Media Outlets & Podcasters",
      body: "Sharing expert insights through collaborative content and interviews that amplify our message.",
    },
    {
      icon: couples,
      header: "Personal Brand Creators",
      body: "We work with photographers, marketers, and web developers to elevate your personal brand journey.",
    },
    {
      icon: family,
      header: "Community Organizations",
      body: "Collaborating with NGOs and youth groups to offer workshops, support groups, and outreach programs.",
    },
  ];
  
  const Partner = ({ icon, header, body }) => {
    return (
      <div className="card">
        <div className="partner-card-img">
          <img src={icon} alt="" />
        </div>
        <div className="partner-card-text">
          <h2>{header}</h2>
          <p>{body}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="trust-container">
      <div className="partner-writeup writeup">
        <h1>Our Strategic Partnerships</h1>
        <p>
          We collaborate with trusted organizations and professionals to enhance
          the value we deliver across counseling, corporate training, and
          personal branding.
        </p>
      </div>
      <div className="partners">
        {partners.map((partner, index) => (
          <Partner key={index} {...partner} />
        ))}
      </div>
      <div className=" partner-button-container">
        <button className="partner-button">Become a Partner</button>
      </div>
    </div>
  );
}

export default Trust

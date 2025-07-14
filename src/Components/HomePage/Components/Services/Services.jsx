import React from 'react';
import './Services.css';
import individual from '../../Assets/individual-counseling.png';
import couples from "../../Assets/couples-counseling.png";
import family from "../../Assets/family-counseling.png";
import group from '../../Assets/group-counseling.png';
import career from '../../Assets/career-counseling.png';
import trauma from "../../Assets/trauma-counseling.png";
import '../../../Get-Started-btn/Get-Started-btn.css';


const Services = () => {
    const sessions = [
      {
        icon: individual,
        header: "Individual Counseling",
        body: "Healthcare Providers & Clinics | HR Departments & Employee Assistance Programs (EAPs) | Wellness & Lifestyle Coach | Community Organizations & NGOs."
      },
      {
        icon: couples,
        header: "Corporate Consulting & Training",
        body: "Industry Associations and Chambers of Commerce | Business Consultancies | Technology Providers (LMS, HR Tech) | Executive Coaching Networks."
      },
      {
        icon: family,
        header: "Personal Brand Development",
        body: "Media Outlets & Publications | Content Creators & Influencers (aligned values) | Professional Photographers & Videographers | Digital Marketing Agencies & Web Developers."
      },
      // {
      //   icon: group,
      //   header: "Group Counseling",
      //   body: "Addiction recovery, Grief support, Social skills development, Coping with shared issues.",
      // },
      // {
      //   icon: career,
      //   header: "Career Counseling",
      //   body: "Career choice or change, Workplace stress, Burnout, Work-life balance.",
      // },
      // {
      //   icon: trauma,
      //   header: "Trauma Counseling",
      //   body: "PTSD, Domestic violence, Childhood abuse, Accident or disaster recovery.",
      // },
    ];

    
    const SessionCard = ({ icon, header, body }) => {
        return (
          <div className="card">
            <div className="session-card-img">
              <img src={icon} alt="" />
            </div>
            <div className="session-card-text">
              <h2>{header}</h2>
              <p>{body}</p>
            </div>
            <div className="gradient-button-container card-button-container">
              <button className="gradient-button card-button">
                View Service
              </button>
            </div>
          </div>
        );
    };

  return (
    <div className="services-container">
      <div className="service-header">
        <span>COREAL8 SERVICES</span>
      </div>
      <div className="service-writeup">
        <h1>Counseling Services</h1>
        <p>
          Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
      </div>
      <div className="services">
        {sessions.map((session, index) => (
          <SessionCard key={index} {...session} />
        ))}
      </div>
      {/* <div className="services-button">
        <button className='dark-bg-btn'>Book Counseling</button>
      </div> */}
    </div>
  );
}

export default Services

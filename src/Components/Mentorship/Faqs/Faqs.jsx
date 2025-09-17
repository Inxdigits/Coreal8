import React, { useState } from 'react';
import './Faqs.css';
import minuscircle from '../../../Assets/CoursesPageAssets/minus-circle.svg';
import pluscircle from "../../../Assets/CoursesPageAssets/plus-circle.svg";

const Faqs = () => {
  const [openFaqId, setOpenFaqId] = useState(null);

  const handleClick = (id) => {
    setOpenFaqId((prevId) => (prevId === id ? null : id));
  };

  const faqs = [
    {
      id: 1,
      question: "What is the difference between mentorship and coaching?",
      answer:
        "Mentorship is a long-term relationship where an experienced individual (the mentor) guides a less-experienced person (the mentee) in a specific field. It's often focused on career and personal development.",
      secondAnswer:
        "Coaching is a more structured, goal-oriented process. A coach works with a client to identify specific goals and create a plan of action to achieve them. It's often a shorter-term engagement focused on performance improvement.",
    },
    {
      id: 2,
      question: "How do I find a mentor or coach?",
      answer:
        "You can browse our directory of mentors and coaches and filter by their expertise, industry, and availability. You can also book a free introductory call to see if a particular mentor or coach is a good fit.",
    },
    {
      id: 3,
      question: "What can I expect from a session?",
      answer:
        "Sessions are tailored to your needs. They typically involve discussing your goals, challenges, and progress. Your mentor or coach will provide guidance, ask probing questions, and help you develop a clear action plan.",
    },
    {
      id: 4,
      question:
        "What is the typical duration of a mentorship or coaching engagement?",
      answer:
        "This varies depending on your goals. Mentorship and coaching engagements often last for a specific number of sessions (e.g., 3, 6, or 12 months) depending on affordability.",
    },
  ];

  const Faq = ({ id, question, answer, secondAnswer }) => {
    const isOpen = openFaqId === id;

    return (
      <div className="faq-card">
        <div onClick={() => handleClick(id)} className="faq-text">
          <h3>{question}</h3>
          {isOpen && (
            <p className="faq-answer">
              {answer}
              <br />
              <br />
              {secondAnswer}
            </p>
          )}
        </div>
        <button className="dropdown-circle" onClick={() => handleClick(id)}>
          <img
            src={isOpen ? minuscircle : pluscircle}
            alt={`Toggle ${question}`}
            className='plusorminus'
          />
        </button>
      </div>
    );
  };

  return (
    <div className="faqs">
      {faqs.map((faq) => (
        <Faq key={faq.id} {...faq} />
      ))}
    </div>
  );
};

export default Faqs;

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
      question: "What is the purpose of counseling?",
      answer:
        "Counseling is a confidential process where you work with a trained professional to explore and address personal challenges, mental health concerns, or emotional distress. It provides a safe space for you to gain insight, develop coping strategies, and work towards positive change.",
    },
    {
      id: 2,
      question: "What types of issues do you specialize in?",
      answer:
        "Our counselor(s) have a wide range of expertise, including but not limited to anxiety, depression, stress management, relationship issues, grief, and career transitions, trauma. You can read the bios of our counselors to find the right fit for your needs.",
    },
    {
      id: 3,
      question: "Is counseling confidential?",
      answer:
        "Yes, confidentiality is a cornerstone of the counseling relationship. All information you share with your counselor is kept strictly private, with a few legal exceptions (e.g., if there is an imminent risk of harm to yourself or others).",
    },
    {
      id: 4,
      question: "How do I get started with counseling?",
      answer:
        "You can book a free 15-minute consultation with a counselor to discuss your needs and see if you feel comfortable working with them. If you decide to move forward, you can then schedule your first full session.",
    },
  ];

  const Faq = ({ id, question, answer }) => {
    const isOpen = openFaqId === id;

    return (
      <div className="faq-card">
        <div onClick={() => handleClick(id)} className="faq-text">
          <h3>{question}</h3>
          {isOpen && (
            <p className="faq-answer">
              {answer}
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

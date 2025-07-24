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
      question: "Do I need leadership experience to enroll?",
      answer:
        "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum...",
    },
    {
      id: 2,
      question: "Are courses live or self-paced?",
      answer:
        "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum...",
    },
    {
      id: 3,
      question: "Can I pay in installments?",
      answer:
        "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum...",
    },
    {
      id: 4,
      question: "How will I access my course?",
      answer:
        "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum...",
    },
    {
      id: 5,
      question: "Do I need leadership experience to enroll?",
      answer:
        "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum...",
    },
  ];

  const Faq = ({ id, question, answer }) => {
    const isOpen = openFaqId === id;

    return (
      <div className="faq-card">
        <div className="faq-text">
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

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
      question: "What is the format of the courses?",
      answer:
        "Our courses are typically delivered through a combination of video lectures, written materials, quizzes, and practical exercises. ",
    },
    {
      id: 2,
      question: "How long do I have to complete a course?",
      answer:
        "Most of our courses are self-paced, giving you the flexibility to learn on your own schedule. Once you enroll, you have access to the course materials.",
    },
    {
      id: 3,
      question: "Are there any prerequisites for your courses?",
      answer:
        "Prerequisites vary by course. Please check the individual course description for specific requirements.",
    },
    {
      id: 4,
      question: "Do I get a certificate upon completion?",
      answer:
        "Yes, upon successful completion of all course modules and requirements, you will receive a certificate of completion.",
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

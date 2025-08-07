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
      question: "How do I know which program or service is right for me?",
      answer:
        "We offer a complimentary discovery call to understand your current needs, challenges, and goals. During the session, we will guide you to the best-fit solution.",
    },
    {
      id: 2,
      question: "What’s the difference between coaching and mentorship?",
      answer:
        "Coaching is usually goal-focused and time-bound with structured sessions, while mentorship involves guidance and sharing of personal experiences to support long-term growth. Our programs can combine both depending on your goals.",
    },
    {
      id: 3,
      question: "Can I work with Coreal8 if I’m outside Nigeria?",
      answer:
        "Absolutely! We work with clients globally via virtual sessions, and our digital resources and communication channels are designed to support international clients.",
    },
    {
      id: 4,
      question: "Do you offer corporate packages or workshops?",
      answer:
        "Yes, we offer customized workshops, strategy sessions, and team training programs for organizations. Please reach out to us directly to discuss your team’s needs.",
    },
    {
      id: 5,
      question: "What payment methods are available?",
      answer:
        "We accept bank transfers, debit/credit cards, and secure online payments through Paystack and Flutterwave. Payment plans are available for selected programs.",
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

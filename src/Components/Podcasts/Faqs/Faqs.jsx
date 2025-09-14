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
      question: "What is the topic of your podcast?",
      answer:
        "Our podcast covers a variety of topics related to having unfiltered conversations e.g., personal growth, career development, mental wellness, entrepreneurship, . We feature interviews with experts, thought leaders, and individuals with inspiring stories.",
    },
    {
      id: 2,
      question: "Where can I listen to the podcast?",
      answer:
        "You can find our podcast on all major platforms, including Apple Podcasts, Spotify, Google Podcasts, and our website.",
    },
    {
      id: 3,
      question: "How often do you release new episodes?",
      answer:
        "We release new episodes every two weeks. You can subscribe to our podcast to get notified when a new episode is available.",
    },
    {
      id: 4,
      question: "How can I be a guest on the podcast?",
      answer:
        "If you are interested in being a guest, please fill out our guest application form on our website. We review all applications and will reach out if we think you would be a good fit for the show.",
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

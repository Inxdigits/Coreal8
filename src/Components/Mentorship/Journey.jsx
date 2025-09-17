import React from "react";

const structures = [
  {
    id: 1,
    title: "Discovery Call",
    description:
      "A complimentary initial conversation to understand your goals, challenges, and determine the best fit for your needs.",
  },
  {
    id: 2,
    title: "Goal Setting & Customization",
    description:
      "Collaborative development of clear, measurable goals and a personalized coaching/mentorship plan tailored to your specific objectives.",
  },
  {
    id: 3,
    title: "Dedicated Sessions",
    description:
      "Regular, focused sessions (virtual or in-person) providing expert guidance, actionable strategies, and supportive accountability.",
  },
  {
    id: 4,
    title: "Ongoing Support",
    description:
      "Access to resources, tools, and between-session support to ensure consistent progress and sustained motivation.",
  },
  {
    id: 5,
    title: "Progress Review & Integration",
    description:
      "Periodic assessments of your progress and strategies for integrating new skills and insights into your daily life and work.",
  }
];

export const Journey = () => {
  return (
    <main className="journey-section">
      <header className="journey-header">
        <h1>
          Your Journey to Mastery: Our Structured Approach
        </h1>
        <p>
          Our programs are designed for impact, combining personalized attention
          with proven methodologies to ensure you achieve your desired outcomes.
        </p>
      </header>
      <div className="structures">
        {structures.map((structure) => (
          <article key={structure.id} className="structure">
            <h2>{structure.title}</h2>
            <p>{structure.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Journey;

import React from "react";

const coachingPrograms = [
  {
    id: 1,
    title: "Executive & Leadership Coaching",
    description:
      "Designed for current and aspiring leaders, this program focuses on enhancing leadership presence, strategic thinking, team management, decision-making, and fostering a high-performance culture",
  },
  {
    id: 2,
    title: "Career & Professional Development Mentorship",
    description:
      "Ideal for individuals navigating career transitions, seeking advancement, or looking to develop specific professional skills. We provide guidance on goal setting, skill enhancement, networking, and strategic career planning.",
  },
  {
    id: 3,
    title: "Personal Brand Coaching",
    description:
      "This program empowers you to articulate your unique value, craft a compelling narrative, and strategically build your authentic personal brand across various platforms, enhancing your visibility and influence.",
  },
  {
    id: 4,
    title: "Life & Personal Growth Coaching",
    description:
      "Focused on personal development, this program helps individuals set and achieve personal goals, improve self-awareness, and develop skills for better life balance and fulfillment.",
  },
  {
    id: 5,
    title: "Team & Organizational Coaching",
    description:
      "Aimed at teams and organizations, this program enhances team dynamics, communication, and collaboration, fostering a culture of continuous improvement and high performance.",
  },
  {
    id: 6,
    title: "Specialized Coaching",
    description:
      "Tailored programs for specific needs such as stress management, work-life balance, or conflict resolution, providing targeted strategies and support.",
  },
  {
    id: 7,
    title: "Workshops & Group Coaching",
    description:
      "Interactive workshops and group coaching sessions that focus on specific skills or topics, providing a collaborative learning environment.",
  },
];

export const Pathways = () => {
  return (
    <main className="pathways">
      <header className="pathways-header header">
        <h1>
          Tailored Pathways to Your Sucess
        </h1>
        <p>
          Whether you're seeking to sharpen leadership skills, navigate career
          transitions, enhance personal impact, or refine your professional
          brand, our programs are designed to meet you where you are and guide
          you to where you want to be.
        </p>
      </header>
      <div className="programs">
        {coachingPrograms.map((program) => (
          <article key={program.id} className="program">
            <h2>{program.title}</h2>
            <p>{program.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
};

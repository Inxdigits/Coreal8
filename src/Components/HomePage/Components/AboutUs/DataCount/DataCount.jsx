import React, { useEffect } from "react";
import "./dataCount.css";

const DataCount = () => {
  // Function to animate the counter
  const animateCounter = (element) => {
    const target = +element.getAttribute("data-target");
    const speed = 200;
    const increment = Math.ceil(target / speed);

    let count = 0;

    const updateCount = () => {
      if (count < target) {
        count += increment;
        element.textContent = count;
        setTimeout(updateCount, 50);
      } else {
        element.textContent = target;
      }
    };

    updateCount();
  };

  useEffect(() => {
    const statNumbers = document.querySelectorAll(".stat-number");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            statNumbers.forEach((statNumber) => animateCounter(statNumber));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const statsSection = document.querySelector(".stats-section");
    if (statsSection) observer.observe(statsSection);
  }, []);

  return (
    <section className="stats-section">
      <div className="stat-item">
        <div className="flex-div">
          <h2 className="stat-number" data-target="25">
            0
          </h2>
          <span className="span-plus">+</span>
        </div>
        <p>Years of leadership experience</p>
      </div>
      <div className="stat-item">
        <div className="flex-div">
          <h2 className="stat-number" data-target="2500">
            0
          </h2>
          <span className="span-plus">+</span>
        </div>
        <p>Trained professionals across Africa</p>
      </div>
      <div className="stat-item">
        <div className="flex-div">
          <h2 className="stat-number" data-target="10">
            0
          </h2>
          <span className="span-plus">+</span>
        </div>
        <p>Masterclasses delivered</p>
      </div>
      <div className="stat-item">
        <div className="flex-div">
          <h2 className="stat-number" data-target="20">
            0
          </h2>
          <span className="span-plus">+</span>
        </div>
        <p>Global conferences Speaker</p>
      </div>
      <div className="stat-item">
        <div className="flex-div">
          <h2 className="stat-number" data-target="10">
            0
          </h2>
          <span className="span-plus">+</span>
        </div>
        <p>Featured media platforms</p>
      </div>
    </section>
  );
};

export default DataCount;

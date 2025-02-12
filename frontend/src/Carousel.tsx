import './components/styles/Carousel.css';
import { useState } from "react";

// Example recipe step data
const steps = [
  {
    id: 1,
    title: "Step 1: Prep Ingredients",
    instructions: [
      "Chop 2 onions finely.",
      "Dice 3 tomatoes.",
      "Mince 4 cloves of garlic.",
    ],
  },
  {
    id: 2,
    title: "Step 2: Cook Base",
    instructions: [
      "Heat oil in a pan.",
      "Sauté onions until golden.",
      "Add tomatoes and garlic, cook for 5 minutes.",
    ],
  },
  {
    id: 3,
    title: "Step 3: Simmer",
    instructions: [
      "Add 1 cup of water.",
      "Simmer for 10 minutes on low heat.",
      "Stir occasionally.",
    ],
  },
  {
    id: 4,
    title: "Step 4: Season",
    instructions: [
      "Add salt and pepper to taste.",
      "Sprinkle fresh herbs.",
      "Mix well and serve.",
    ],
  },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const nextStep = () => {
    setIndex((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="carousel-container">
      {/* Left Button */}
      <button onClick={prevStep} className="mini-card button">
        ←
      </button>

      {/* Main Step Card Display */}
      <div className="carousel-wrapper">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className={`step-card ${i === index ? "active" : "inactive"}`}
          >
            <h2 className="step-title">{step.title}</h2>
            <ul className="step-instructions">
              {step.instructions.map((instruction, idx) => (
                <li key={idx}>{instruction}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button onClick={nextStep} className="mini-card button">
        →
      </button>

      {/* Mini-Bar with All Step Previews */}
      <div className="mini-bar">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className={`mini-card ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          >
            <span className="mini-card-number">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel; 
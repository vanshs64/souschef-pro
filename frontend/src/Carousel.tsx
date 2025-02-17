import './components/styles/Carousel.css';
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Users } from 'lucide-react';

const RecipeCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  
  // Given recipe data
  const recipe = {
    title: 'Palak Paneer Recipe (Spinach Paneer)',
    total_time: 45,
    yields: '2 servings',
    ingredients: [
      '150 grams (1¼ cups) paneer (Indian cottage cheese)',
      '3½ to 4 cups (100 to 120 grams) palak (spinach)',
      '2 tablespoons oil (or half oil & half butter)',
      '2 green chilies (deseeded, less spicy kind)',
      '¾ cup (90 grams, 1 small) onions (fine chopped)',
      '½ cup (1 small) tomatoes (deseeded & chopped or pureed)',
      '¾ teaspoon ginger garlic paste (read notes for substitute)',
      '½ teaspoon salt (use as per your taste)',
      '8 to 10 cashewnuts (read notes for substitutes)',
      '½ to ¾ teaspoon garam masala (adjust to taste)',
      "½ teaspoon kasuri methi (dried fenugreek leaves, skip if you don't have)",
      '¼ cup water (to blend spinach)',
      '¾ cup water (to cook the gravy)',
      '3 tablespoons cream (optional)',
      '⅛ teaspoon cumin seeds (jeera, optional)',
      '2 green cardamoms (elaichi, optional)',
      '1 inch cinnamon (dalchini, optional)',
      '2 cloves (laung, optional)'
    ],
    instructions: [
      [
        'Preparation',
        [
          'Pluck only the young & tender spinach leaves and discard the stems as they may leave a bitter taste. If using baby spinach you can use the stems as well.',
          'Add them to a large pot of water. Rinse them well few times & drain to a colander.',
          'Allow the water to drain completely otherwise it will let out lot of moisture while cooking.'
        ]
      ],
      [
        'Cooking Spinach',
        [
          [
            'Heat half tablespoon oil in a pan. Saute green chilies, cashews and spinach for 3 to 4 mins until the leaves wilt off thoroughly & raw smell of spinach has gone away.',
            'Cool this completely. Blend this along with water to a smooth puree. The puree should be smooth and thick. You may add 1 to 2 tbsps more water to help in blending.'
          ],
          [
            'Another option is to blanch the palak in 4 cups of hot water with ¼ tsp salt for 2 mins. Then immerse in ice cold water. Drain completely.',
            'Cool this completely. Blend this along with water to a smooth puree. The puree should be smooth and thick. You may add 1 to 2 tbsps more water to help in blending.'
          ]
        ]
      ],
      [
        'Making Palak Paneer',
        [
          'Heat 1 tablespoon butter and half tablespoon oil to the same pan, Once they melt, add cinnamon, cardamoms, cloves & cumin seeds.',
          'When the spices begin to sizzle, add onions and fry till they turn transparent to golden.',
          'Next saute ginger garlic paste for 1 to 2 minutes or until you begin to smell it nice.',
          'Then add tomatoes with salt. Saute until they break down and turn mushy.',
          'Add garam masala & saute until the masala smells good. This may take 2 mins.',
          'Pour water and cook covered until onions are completely soft. There should be some water left in the pan.',
          'Lower the flame, add kasuri methi and pureed spinach. Mix well and cook until it begins to bubble for about 2 to 3 mins. If the curry is too thick you may add a few tbsps of hot water.',
          'Avoid overcooking. Add paneer & mix well. Turn off and remove to a serving bowl. Optionally garnish with cream.'
        ]
      ],
      [
        'Serving',
        [
          'Serve palak paneer with naan, roti, Basmati rice or Jeera rice.'
        ]
      ]
    ]
  };


  useEffect(() => {
    if (!recipe?.instructions) return;

    const parseInstructions = (instructions) => {
      let parsedSteps = [];
      let stepCounter = 1;
      
      instructions.forEach(([sectionTitle, sectionContent]) => {
        if (Array.isArray(sectionContent)) {
          // Handle direct steps
          if (typeof sectionContent[0] === 'string') {
            parsedSteps.push({
              id: stepCounter++,
              title: sectionTitle,
              section: sectionTitle,
              steps: sectionContent.map(step => 
                step.split(/\.\s+/)
                   .filter(s => s.length > 0)
                   .map(s => s + (s.endsWith('.') ? '' : '.'))
              ).flat()
            });
          } else {
            // Handle nested arrays
            sectionContent.forEach(content => {
              if (Array.isArray(content)) {
                const [subTitle, ...subSteps] = content;
                parsedSteps.push({
                  id: stepCounter++,
                  title: subTitle,
                  section: sectionTitle,
                  steps: subSteps.map(step => 
                    step.split(/\.\s+/)
                       .filter(s => s.length > 0)
                       .map(s => s + (s.endsWith('.') ? '' : '.'))
                  ).flat()
                });
              }
            });
          }
        }
      });
      return parsedSteps;
    };
    
    setSteps(parseInstructions(recipe.instructions));
  }, [recipe]);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  if (steps.length === 0) {
    return (
      <div className="recipe-page">
        <div className="loading">Loading recipe...</div>
      </div>
    );
  }

  return (
    <div className="recipe-page">
      {/* Recipe Header */}
      <div className="recipe-header">
        <h1 className="recipe-title">{recipe.title}</h1>
        <div className="recipe-meta">
          <div className="meta-item">
            <Clock className="meta-icon" />
            <span>{recipe.total_time} mins</span>
          </div>
          <div className="meta-item">
            <Users className="meta-icon" />
            <span>{recipe.yields}</span>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        {/* Ingredients Sidebar */}
        <div className="ingredients-sidebar">
          <div className="ingredients-card">
            <h2 className="ingredients-title">Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="carousel-section">
          <div className="carousel-card">
            {/* Progress Indicator */}
            <div className="progress-container">
              <div className="progress-header">
                <span className="progress-text">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="progress-text">
                  {steps[currentStep]?.section}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="step-content">
              <h3 className="step-title">
                {steps[currentStep]?.title}
              </h3>
              <ul className="step-list">
                {steps[currentStep]?.steps.map((step, idx) => (
                  <li key={idx}>
                    <span className="step-bullet">•</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div className="navigation">
              <button
                onClick={prevStep}
                className="nav-button prev"
                disabled={currentStep === 0}
              >
                <ChevronLeft />
                Previous
              </button>
              <div className="step-dots">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`step-dot ${idx === currentStep ? 'active' : ''}`}
                  />
                ))}
              </div>
              <button
                onClick={nextStep}
                className="nav-button next"
                disabled={currentStep === steps.length - 1}
              >
                Next
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCarousel;
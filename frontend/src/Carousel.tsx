import './components/styles/Carousel.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, Home, X } from 'lucide-react';

// Define the structure of the recipe data
interface RecipeData {
  title: string;
  totalTime: number;
  yields: string;
  ingredients: string[];
  instructions: Array<[string, (string | string[])[]]>;
}

// Define the structure of a step
interface Step {
  id: number;
  title: string;
  section: string;
  steps: string[];
}

const RecipeCarousel = () => {
  const location = useLocation();
  const recipe = location.state as RecipeData; // Get recipe data from useLocation

  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<Step[]>([]);

  const navigate = useNavigate();
  const [showCompletion, setShowCompletion] = useState(false);
  const isLastStep = currentStep === steps.length -1;

  const handleComplete = () => {
    setShowCompletion(true);
  };


  // Parse instructions into steps
  useEffect(() => {
    if (!recipe?.instructions) return;

    const parseInstructions = (instructions: Array<[string, (string | string[])[]]>): Step[] => {
      let parsedSteps: Step[] = [];
      let stepCounter = 1;

      instructions.forEach(([sectionTitle, content]) => {
        if (Array.isArray(content)) {
          if (content.every((item) => typeof item === 'string')) {
            // Handle simple string array, splitting sentences
            parsedSteps.push({
              id: stepCounter++,
              title: sectionTitle,
              section: sectionTitle,
              steps: content.flatMap((step) =>
                step.split(/(?<=\.)\s+/).map((s) => s.trim()).filter((s) => s.length > 0)
              ),
            });
          } else {
            // Handle nested arrays
            content.forEach((subContent) => {
              if (Array.isArray(subContent)) {
                parsedSteps.push({
                  id: stepCounter++,
                  title: sectionTitle,
                  section: sectionTitle,
                  steps: subContent.flatMap((step) =>
                    typeof step === 'string'
                      ? step.split(/(?<=\.)\s+/).map((s) => s.trim()).filter((s) => s.length > 0)
                      : []
                  ),
                });
              } else if (typeof subContent === 'string') {
                parsedSteps.push({
                  id: stepCounter++,
                  title: sectionTitle,
                  section: sectionTitle,
                  steps: subContent.split(/(?<=\.)\s+/).map((s) => s.trim()).filter((s) => s.length > 0),
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

  // Navigate to the next step
  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  // Navigate to the previous step
  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };



  // Show loading state if steps are not yet parsed
  if (steps.length === 0) {
    return (
      <div className="recipe-page">
        <div className="loading">Loading recipe...</div>
      </div>
    );
  }

  interface CompletionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onNewRecipe: () => void;
  }

  const CompletionModal = ({ isOpen, onClose, onNewRecipe }: CompletionModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-backdrop" onClick={onClose} />
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
          <div className="modal-body">
            <h2>Congratulations!</h2>
            <p>You've successfully completed this recipe. Time to taste your creation!</p>
            <div className="modal-actions">
              <button className="modal-button primary" onClick={onNewRecipe}>
                <Home className="w-4 h-4" />
                Try New Recipe
              </button>
              <button className="modal-button secondary" onClick={onClose}>
                Stay Here
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <div className="recipe-page">
      {/* Recipe Header */}
      <div className="recipe-header">
        <h1 className="recipe-title">{recipe.title}</h1>
        <div className="recipe-meta">
          <div className="meta-item">
            <Clock className="meta-icon" />
            <span>{recipe.totalTime} mins</span>
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
                {recipe.ingredients.map((ingredient: string, idx: number) => (
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
                {Array(steps.length).fill(0).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`step-dot ${idx === currentStep ? 'active' : ''}`}
                  />
                ))}
              </div>

              <button 
                onClick={isLastStep ? handleComplete : nextStep} 
                className="nav-button next"
              >
                Next
                <ChevronRight />
              </button>
            </div>

            <CompletionModal 
              isOpen={showCompletion}
              onClose={() => setShowCompletion(false)}
              onNewRecipe={() => navigate('/')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCarousel;
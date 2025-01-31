import { useState } from 'react';
import reactLogo from './assets/react.svg';
import CookingPotLogo from './components/ChefLogo.tsx'; // Import the ChefLogo component

import RecipeForm from './components/RecipeForm.tsx'; // Import the RecipeForm component

import './App.css';

import "reactflow/dist/style.css";

type Instruction = string | Instruction[];

const instructions: Instruction[] = [
  [
    "Gather all ingredients.",
    "Preheat the oven to 375 degrees F (190 degrees C)."
  ],
  [
    "Stir flour, baking soda, and baking powder together in a small bowl.",
    "Beat sugar and butter together in a large bowl with an electric mixer until smooth."
  ],
  "Beat in egg and vanilla.",
  "Gradually blend in flour mixture.",
  "Roll dough into walnut-sized balls and place 2 inches apart onto ungreased baking sheets.",
  [
    "Bake in the preheated oven until edges are golden, 8 to 10 minutes.",
    "Cool on the baking sheets briefly before removing to a wire rack to cool completely."
  ]
];
// Global step counter to ensure unique step numbers
let stepCounter = 1;

// Recursive function to render the tree
const renderTree = (steps: Instruction[], level = 0): JSX.Element => {
  return (
    <div className="tree-level">
      {steps.map((step, index) => {
        const currentStepNumber = stepCounter++;
        return (
          <div className="tree-node-container" key={`${level}-${index}`}>
            <div className="step-label">Step {currentStepNumber}</div>
            <div className="tree-node">
              {Array.isArray(step) ? null : step}
            </div>
            {Array.isArray(step) && (
              <div className="tree-branch">
                <div className="tree-line"></div>
                {renderTree(step, level + 1)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};


function App() {
  const [recipe, setRecipe] = useState([]);

  // get the recipe from the flask server --> FETCH is the most important thing here
  const fetchRecipe = async () => {
    const response = await fetch("http://localhost:5000/scrape_recipe");
    const data = await response.json();
    setRecipe(data.instructions);
    console.log(data.instructions);
  };

  return (
    <>

    <header className="navbar">
      <div className="navbar-logo">
        <CookingPotLogo />
      </div>
      <div className="navbar-title">
        <h1>SousChef</h1>
      </div>
    </header>

      {/* Replace the image logo with the ChefLogo component */}
      
      <div className="title-container">
        <CookingPotLogo/>
        
        <div className="logo-header-container">
          <h2>SousChef</h2>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>What are we cooking today?</h1>
        <RecipeForm />

      </div>

      <div className="card">
        <input
          type="url"
          placeholder="Enter recipe URL"
          className='formButton'
        />
        <button onClick={fetchRecipe}>
          Get Recipe
        </button>
        <p className=''>Here is the recipe: {recipe}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div className="tree-container">{renderTree(instructions)}</div>
    </>
  );
}

export default App;
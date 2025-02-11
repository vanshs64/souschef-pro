// discontinued


import React, { useState } from "react";
import "./styles/RecipeForm.css"; // Import the CSS file

const RecipeForm: React.FC = () => {
  const [recipeInput, setRecipeInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // check if submitted text is mostly a valid url (https://)
  const handleRecipeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // if input is empty, set error message
    if (!recipeInput.trim()) {
      setErrorMessage("Please enter a recipe URL or instructions.");
      return;
    }

    setErrorMessage("");
    console.log("Recipe Input:", recipeInput);
    // Add your processing logic here
  };

  return (
    
    <div className="recipe-input-container">
      <h2 className="recipe-prompt">2 What are we cooking today?</h2>
      <form onSubmit={handleRecipeSubmit} className="recipe-input-form">
        <div className="error-message">{errorMessage}</div>
        <div className="input-group">
          <input
            type="url"
            name="recipeURL-3"
            placeholder="Enter recipe URL"
            className="rounded-input"
          />
          <button type="submit">Process</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
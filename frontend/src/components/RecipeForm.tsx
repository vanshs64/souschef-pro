import React, { useState } from "react";
import "./styles/RecipeForm.css"; // Import the CSS file

const RecipeForm: React.FC = () => {
  const [recipeInput, setRecipeInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRecipeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeInput.trim()) {
      setError("Please enter a recipe URL or instructions.");
      return;
    }
    setError("");
    console.log("Recipe Input:", recipeInput);
    // Add your processing logic here
  };

  return (
    <div className="recipe-input-container">
      <h2 className="recipe-prompt">2 What are we cooking today?</h2>
      <form onSubmit={handleRecipeSubmit} className="recipe-input-form">
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <input
            type="url"
            name="recipeURL-2"
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
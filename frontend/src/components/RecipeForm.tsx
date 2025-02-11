import React, { useState } from "react";
import "./styles/RecipeForm.css"; // Import the CSS file

const RecipeForm: React.FC = () => {
  const [recipeInput, setRecipeInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  // check if submitted text is mostly a valid url (https://)
  const handleRecipeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", "i" // fragment locator
    );

    if (!recipeInput.trim()) {
      setError("Please enter a recipe URL or instructions.");
      return;
    }

    if (!urlPattern.test(recipeInput)) {
      setError("Please enter a valid URL.");
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
            value={recipeInput}
            onChange={(e) => setRecipeInput(e.target.value)}
          />
          <button type="submit">Process</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
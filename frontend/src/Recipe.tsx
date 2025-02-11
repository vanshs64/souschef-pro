import Instruction from './App'; // Import the Instruction type
import RenderTree from './components/RenderTree.tsx';

type RecipeProps = {
  title: string;
  totalTime: number;
  yields: string;
  ingredients: string[];
  instructions: [];
  onBack: () => void; // Callback to navigate back to the homepage
};

const Recipe = ({ title, totalTime, yields, ingredients, instructions, onBack }: RecipeProps) => {
  return (
    <div className="recipe-container">
      <button onClick={onBack} className="back-button">
        &larr; Back to Home
      </button>

      <div className="sidebar">
        <h2>{title}</h2>
        <p>Total Time: {totalTime} minutes</p>
        <p>Yields: {yields}</p>
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="tree-container">
        {RenderTree(instructions)}
      </div>
    </div>
  );
};

export default Recipe;
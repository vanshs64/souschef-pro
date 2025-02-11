import { useState } from 'react';
import reactLogo from './assets/react.svg';
import CookingPotLogo from './components/ChefLogo.tsx';
import RecipeForm from './components/RecipeForm.tsx';
import RenderTree from './components/RenderTree.tsx';
import './App.css';
import "reactflow/dist/style.css";

type Instruction = string | Instruction[];

function App() {
  const [title, setTitle] = useState<string>('');
  const [totalTime, setTotalTime] = useState<number>(0);
  const [yields, setYields] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [recipeFetched, setRecipeFetched] = useState<boolean>(false);

  const fetchRecipe = async () => {
    try {
      const recipeURL = (document.getElementsByName("recipeURL")[0] as HTMLInputElement).value;

      const response = await fetch("http://localhost:5000/scrape_recipe", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: recipeURL }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTitle(data.title);
      setTotalTime(data.total_time);
      setYields(data.yields);
      setIngredients(data.ingredients);
      setInstructions(data.instructions);
      setRecipeFetched(true);

      console.log("A recipe was received, here it is:");
      console.log(typeof data.instructions);
      console.log(data.instructions);
    } catch (error) {
      console.error("There was an error fetching the recipe:", error);
    }
  };

  return (
    <>
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

        {recipeFetched && (
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
          </div>)
        }
      <div className="card">
        <input
          type="url"
          name="recipeURL"
          placeholder="Enter recipe URL"
          className='formButton'
        />

        <button onClick={fetchRecipe}>
          Get Recipe
        </button>

        <p className=''>Here is the recipe: {instructions}</p>
      </div>


      <div className="tree-container">{RenderTree(instructions)}</div>
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import './App.css';
import './components/styles/RecipeForm.css';
import "reactflow/dist/style.css";
import { useNavigate } from 'react-router-dom';

type Instruction = string | Instruction[];

function App() {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [totalTime, setTotalTime] = useState<number>(0);
  const [yields, setYields] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [recipeFetched, setRecipeFetched] = useState<boolean>(false);
  const [recipeInput, setRecipeInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  // redirect or "navigate" to the recipe page ONLY if "recipeFetched" is true, and this only happens once 
  // first, form is submitted, url is verified to be valid (handle recipe submit), and then fetchRecipe is called and completed!!

  useEffect(() => {
    if (recipeFetched) {
      navigate("/recipe", { state: { 
        title: title, 
        totalTime: totalTime, 
        yields: yields, 
        ingredients: ingredients, 
        instructions: instructions 
      }});
    }
  }, [recipeFetched]);

  const fetchRecipe = async () => {
    try {
      const recipeURL = (document.getElementsByName("recipeURL")[0] as HTMLInputElement).value;

      if (!isValidURL(recipeURL)) {
        setErrorMessage("Please enter a valid URL.");
        return;
      }

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
      console.log("first, the actual title is: ", data.title);

      setTitle(data.title);
      setTotalTime(data.total_time);
      setYields(data.yields);
      setIngredients(data.ingredients);
      setInstructions(data.instructions);
      setRecipeFetched(true);

      console.log("A recipe was received, here it is:");
      console.log(data.instructions);

    } catch (error) {
      console.error("There was an error fetching the recipe:", error);
    }
  };

  const handleRecipeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipeInput.trim()) {
      setErrorMessage("Please enter a recipe URL or instructions.");
      return;
    }

    if (!isValidURL(recipeInput)) {
      setErrorMessage("Please enter a valid URL.");
      return;
    }

    setErrorMessage("");
    console.log("Recipe Input:", recipeInput);
    fetchRecipe(); // Call fetchRecipe if there are no errors
  };

  return (
    <>
      <div className="title-container">
        <div className="logo-header-container">
          <a href="/">
            <img src={logo} className="logo souschef" alt="My logo" />
          </a>
        </div>
        <h1>What are we cooking today?</h1>

        <div className="recipe-input-container">
          <p className="recipe-prompt">🍳 Ask <strong>SousChef</strong> 🥘 </p>
          <form onSubmit={handleRecipeSubmit} className="recipe-input-form">
            <div className="error-message">{errorMessage}</div>
            <div className="input-group">
              <input
                type="url"
                name="recipeURL"
                placeholder="Enter recipe URL"
                className="rounded-input"
                value={recipeInput}
                onChange={(e) => setRecipeInput(e.target.value)}
              />
              <button type="submit">Process</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;

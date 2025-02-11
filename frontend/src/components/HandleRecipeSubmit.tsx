import { useState } from 'react';

type Instruction = string | Instruction[];


const [errorMessage, setErrorMessage] = useState<string>("");


const handleRecipeSubmission = (e: React.FormEvent, urlInput: string) => {
    e.preventDefault();

    // if input is empty, set error message
    if (!urlInput.trim()) {
        setErrorMessage("Please enter a recipe URL or instructions.");
        return false;
    }

    setErrorMessage("");
    console.log("Recipe Input:", urlInput);
    
    return urlInput;
};

handleRecipeSubmission(new Event('submit') as React.FormEvent, 'https://dummyurl.com');

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

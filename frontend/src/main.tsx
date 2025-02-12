import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import RecipePage from './RecipePage.tsx'; // Import other pages/components as needed
import Carousel from './Carousel.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/carousel" element={<Carousel/>}/>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  </StrictMode>,
);


// Note, App.tsx contains the main page of the application with the form and title
// Note, RecipePage.tsx contains the recipe page information, and displays the actual instructions with optimized timeline

// Next, to add title+ingredients+changing clock svg on the time for each instruction in the carousel
// May need to revitalize interpret.py or some way to actually optimize the recipe. Although the ui and actual display was difficult and is very import in how the recipe is displayed, the actual structure of the recipe as a data structure is equally important for how to display it, because each step likely requires a mini title "simmer" "prepare ingredeints" and then a time for each ingredient, a note suggesting "you should work on step X while step 4 is ongoing so you don't waste time sitting around while water is boiling or the oven is preheating" and also take a note of the redirect from main page to the carousel/recipe page, cuz if it is acccessed by url, it should not dispay anything but only through the submission of the form on the main app page. but that is not as important, anyway. anyawys carousel is now working! just need to display more information. 
// new idea i had, when you are focused on one instruction/step in the recipe, the ingredients involved in the ingredients sidebar on the left will be highlighted! like it tells you by coloring out the involved ingredients for that step on the left menu so you don't need to waste time reading extra stuff. i think its a really good idea, the best way would probably to use AI again to recognize the ingredient keywords by cross referencing the list to the instruction and telling which index of the ingredients list are involved and then we can change the css of those to highlight them and give emphasis. just an idea.

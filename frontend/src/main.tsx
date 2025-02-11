import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import RecipePage from './RecipePage.tsx'; // Import other pages/components as needed

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recipe" element={<RecipePage recipeInformation={null} />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  </StrictMode>,
);


// Note, App.tsx contains the main page of the application with the form and title
// Note, RecipePage.tsx contains the recipe page information, and displays the actual instructions with optimized timeline
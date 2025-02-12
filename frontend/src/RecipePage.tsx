import { useLocation } from 'react-router-dom';
import RenderTree from './components/RenderTree';

const RecipePage = () => {
  const location = useLocation();
  const { title, totalTime, yields, ingredients, instructions } = location.state || {};

  console.log("a recipe was argued to the recipe page, here it is: ", location.state);

  return (
    <div className="recipe-container">
      <p>{title}</p>
      <p>{ingredients}</p>
      <p>{instructions}</p>
      <h1>{title}</h1>
      <p>Total Time: {totalTime} minutes</p>
      <p>Yields: {yields}</p>
      <h3>Ingredients:</h3>
      <ul>
        {ingredients?.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <div className="tree-container">{instructions && RenderTree(instructions)}</div>
    </div>
  );
};

export default RecipePage;

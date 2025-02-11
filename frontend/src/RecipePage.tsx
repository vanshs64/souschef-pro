import { Navigate } from 'react-router-dom';

// recipe page information function takes in a dictionary of key value pairs (string, any) or null type as input
function Recipe({ recipeInformation }: { recipeInformation: Record<string, any> | null }) {

  if (!recipeInformation) {
    return <Navigate to={"/"} />;
  }

  // Render the recipe information here
  return (
    <div>
      {/* Render recipe details */}
      Hello ABCD
    </div>
  );
}

export default Recipe
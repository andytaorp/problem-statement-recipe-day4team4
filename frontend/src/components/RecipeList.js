import { useEffect, useState } from "react";
import RecipeDetails from "./RecipeDetails"; // Displays each recipe
import RecipeForm from "./RecipeForm"; // Form to add recipes

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recipes from API
  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/recipes");
      const data = await response.json();
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(); // Load recipes when component mounts
  }, []);

  // Function to add new recipe to state instantly (without re-fetching all)
  const handleRecipeAdded = (newRecipe) => {
    setRecipes((prevRecipes) => [newRecipe, ...prevRecipes]); // Add to state immediately
  };

  return (
    <div>
      <h1>All Recipes</h1>
      <RecipeForm onRecipeAdded={handleRecipeAdded} /> {/* Pass callback to form */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeDetails key={recipe._id} recipe={recipe} />
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeList;

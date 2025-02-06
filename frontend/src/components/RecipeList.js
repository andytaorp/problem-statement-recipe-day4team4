import { useEffect, useState } from "react";
import RecipeDetails from "./RecipeDetails"; // Assuming this exists to show details

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes") // Update with actual API URL
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>All Recipes</h1>
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

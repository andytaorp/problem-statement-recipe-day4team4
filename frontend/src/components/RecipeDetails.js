import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Failed to fetch recipe", error);
      }
    };
    fetchRecipe();
  }, [id]);


  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Preparation Time:</strong> {recipe.prepTime} minutes</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
    </div>
  );
};

export default RecipeDetails;
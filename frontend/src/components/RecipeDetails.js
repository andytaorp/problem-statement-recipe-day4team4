import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  // Fetch recipe details
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

  const deleteRecipe = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Recipe deleted ");
        navigate("/"); 
      } else {
        throw new Error("Failed to delete recipe");
      }
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Preparation Time:</strong> {recipe.prepTime} minutes</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>

      <button onClick={deleteRecipe} className="delete-btn">Delete Recipe</button>
    </div>
  );
};

export default RecipeDetails;
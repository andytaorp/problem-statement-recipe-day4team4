import { useEffect, useState } from "react";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
}

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


  if (error) return <div className="error">{error}</div>;
  if (recipes.length === 0) return <div>Loading recipes...</div>;

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
     <div className="recipe-list">
      <h2>All Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe._id} className="recipe-card">
          <h3>{recipe.name}</h3>
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
          <p><strong>Preparation Time:</strong> {recipe.prepTime} minutes</p>
          <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
        </div>
      ))}
    </div>
  );
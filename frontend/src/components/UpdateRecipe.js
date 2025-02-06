import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateRecipe = () => {
  const { id } = useParams(); // Get recipe ID from URL
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    preparationTime: "",
    difficulty: "easy",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the existing recipe details
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details.");
        }
        const data = await response.json();
        setRecipe({
          name: data.name,
          ingredients: data.ingredients.join(", "), // Convert array to comma-separated string
          instructions: data.instructions,
          preparationTime: data.preparationTime,
          difficulty: data.difficulty,
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/recipes/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send JWT token
          },
          body: JSON.stringify({
            ...recipe,
            ingredients: recipe.ingredients.split(", "), // Convert back to array
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update recipe.");
      }

      navigate("/"); // Redirect to home page after update
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Update Recipe</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <label>Recipe Name:</label>
            <input
              type="text"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Ingredients (comma-separated):</label>
            <input
              type="text"
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Instructions:</label>
            <textarea
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Preparation Time (minutes):</label>
            <input
              type="number"
              name="preparationTime"
              value={recipe.preparationTime}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Difficulty Level:</label>
            <select name="difficulty" value={recipe.difficulty} onChange={handleChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button type="submit">Update Recipe</button>
        </form>
      )}
    </div>
  );
};

export default UpdateRecipe;

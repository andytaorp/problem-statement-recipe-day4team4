import { useState } from 'react';
import { useRecipeContext } from '../hooks/useRecipeContext';
import { useAuthContext } from '../hooks/useAuthContext';

const RecipeDetails = ({ recipe }) => {
  const { dispatch } = useRecipeContext();
  const { user } = useAuthContext();
  
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(recipe.name);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [prepTime, setPrepTime] = useState(recipe.prepTime || '');
  const [difficulty, setDifficulty] = useState(recipe.difficulty || 'Easy'); 

  // Handle delete recipe
  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/recipes/:id:' + recipe._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();
  
    if (response.ok) {
      dispatch({ type: 'DELETE_RECIPE', payload: json });
    }
  };

  // Handle edit (save changes)
  const handleEdit = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const updatedRecipe = { title, ingredients, instructions, prepTime, difficulty };

    const response = await fetch('/api/recipes/:id:' + recipe._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(updatedRecipe),
    });
    
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_RECIPE', payload: json });
      setIsEditing(false);  // Exit edit mode
    }
  };

  return (
    <div className="recipe-details">
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <label>Recipe Name: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Ingredients:</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />

          <label>Cooking Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />

          <label>Preparation Time (mins):</label>
          <input
            type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            required
          />

          <label>Difficulty Level:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h4><strong>Recipe Name:</strong>{recipe.name}</h4>
          <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
          <p><strong>Preparation Time:</strong> {recipe.prepTime} minutes</p>
          <p><strong>Difficulty:</strong> {recipe.difficulty}</p>

          <span className="delete-icon" onClick={handleClick}>×</span>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Recipe</button>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRecipeForm from "../hooks/useRecipeForm";
import { getRecipeById } from "../services/api";
import "../styles/components/_editRecipe.scss";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    title,
    ingredients,
    instructions,
    description,
    calories,
    prepTime,
    cookTime,
    category,
    setTitle,
    setIngredients,
    setInstructions,
    setDescription,
    setCalories,
    setPrepTime,
    setCookTime,
    setCategory,

    setImage,
    handleEdit,
  } = useRecipeForm();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipe = await getRecipeById(id);
        setTitle(recipe.title);
        setIngredients(recipe.ingredients);
        setInstructions(recipe.instructions);
        setDescription(recipe.description);
        setCalories(recipe.calories);
        setCookTime(recipe.cook_time);
        setPrepTime(recipe.prep_time);
        setImage(null); // Initialize image state to null
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [
    id,
    setTitle,
    setIngredients,
    setInstructions,
    setDescription,
    setCalories,
    setCookTime,
    setPrepTime,
    setImage,
  ]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleEdit(id); // Ensure this handles the form data correctly
      navigate("/recipes"); // Redirect to recipe list page after edit
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-recipe-container">
      <h2>Edit Recipe</h2>
      <form onSubmit={onSubmit} className="edit-recipe-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="edit-recipe-input"
          placeholder="Title"
          required
        />
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="edit-recipe-textarea"
          placeholder="Ingredients"
        />
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="edit-recipe-textarea"
          placeholder="Instructions"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="edit-recipe-textarea"
          placeholder="Description"
        />
        <textarea
          value={calories}
          onChange={(e) => setCalories(parseInt(e.target.value) || 0)}
          className="edit-recipe-textarea"
          placeholder="Calories"
        />
        <textarea
          value={prepTime}
          onChange={(e) => setPrepTime(parseInt(e.target.value) || 0)}
          className="edit-recipe-textarea"
          placeholder="Prep Time"
        />
        <textarea
          value={cookTime}
          onChange={(e) => setCookTime(parseInt(e.target.value) || 0)}
          className="edit-recipe-textarea"
          placeholder="Cook Time"
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="edit-recipe-input"
        />
        <button type="submit" className="edit-recipe-submit-btn">
          Update Recipe
        </button>
      </form>
    </div>
  );
}

export default EditRecipe;

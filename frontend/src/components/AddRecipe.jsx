import React, { useState } from "react";
import useRecipeForm from "../hooks/useRecipeForm";
import "../styles/components/_addRecipe.scss";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
  const navigate = useNavigate();
  const {
    title,
    ingredients,
    instructions,
    description,
    setTitle,
    setIngredients,
    setInstructions,
    setDescription,
    handleSubmit,
    setImage,
  } = useRecipeForm();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage("");

    try {
      await handleSubmit(); // handleSubmit returns the API response

      // Clear form fields after successful submission
      setTitle("");
      setIngredients("");
      setInstructions("");
      setDescription("");
      setImage(null);

      // Show success message and navigate after delay
      setMessage("Recipe added successfully!");
      setLoading(false);

      setTimeout(() => {
        navigate("/recipes");
      }, 2000);
    } catch (err) {
      console.error("Error adding recipe:", err);
      setError(true);
      setMessage("Failed to add the recipe. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Add Recipe</h2>
      <form onSubmit={handleFormSubmit} className="add-recipe-form">
        <div className="input-container">
          <h3>Title</h3>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Recipe Title"
          />
        </div>
        <div className="input-container">
          <h3>Ingredients</h3>
          <textarea
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            placeholder="Enter ingredients separated by commas"
          />
        </div>
        <div className="input-container">
          <h3>Instructions</h3>
          <textarea
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
            placeholder="Enter instructions separated by commas"
          />
        </div>
        <div className="input-container">
          <h3>Description</h3>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter a description"
          />
        </div>
        <div className="input-container">
          <h3>Image</h3>
          <label className="add-recipe__file-label" htmlFor="file-input">
            Choose File
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="add-recipe__file-input"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          className="add-recipe-submit-btn"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Recipe"}
        </button>
      </form>
      <div className="add-message-container">
        {message && (
          <p className={error ? "recipe-failure" : "recipe-success"}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AddRecipe;

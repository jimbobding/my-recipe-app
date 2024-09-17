import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRecipeForm from "../hooks/useRecipeForm";
import "../styles/components/_addRecipe.scss";

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
    imageUrl,
  } = useRecipeForm();

  const [message, setMessage] = useState(""); // State for success or error message
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  // Wrap handleSubmit to handle additional logic
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await handleSubmit(); // Assuming handleSubmit returns a promise
      setMessage("Recipe added successfully!");
      setLoading(false);
      setTimeout(() => {
        navigate("/recipes"); // Redirect to recipes page after 2 seconds
      }, 2000); // Optional: Delay to show the success message
    } catch (error) {
      console.error("Error adding recipe:", error);
      setMessage("Failed to add recipe. Please try again.");
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
            required
          />
        </div>
        <div className="input-container">
          <h3>Ingredients</h3>
          <textarea
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            placeholder="Enter ingredients separated by commas"
            required
          />
        </div>
        <div className="input-container">
          <h3>Instructions</h3>
          <textarea
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
            placeholder="Enter instructions separated by commas"
            required
          />
        </div>
        <div className="input-container">
          <h3>Description</h3>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter a description"
            required
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
        {imageUrl && (
          <div className="image-preview">
            <img src={imageUrl} alt="Recipe" />
          </div>
        )}
        <button
          type="submit"
          className="add-recipe-submit-btn"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Recipe"}
        </button>
      </form>
      {message && <p>{message}</p>} {/* Display the success or error message */}
    </div>
  );
}

export default AddRecipe;

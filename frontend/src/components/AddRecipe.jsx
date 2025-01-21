import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRecipeForm from "../hooks/useRecipeForm";
import { useAuth } from "../context/AuthContext"; // Import useAuth to access userId from AuthContext
import "../styles/components/_addRecipe.scss";

function AddRecipe() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Access user object from AuthContext
  const userId = user?.userId; // Extract userId safely

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
    handleSubmit,
    setImage,
  } = useRecipeForm(userId); // Pass userId to the hook

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file); // Store the selected image
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
      setCalories("");
      setPrepTime("");
      setCookTime("");
      setCategory("");

      // Show success message and navigate after a delay
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
      console.log(calories);
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
            required // Ensure the title is required
          />
        </div>
        <div className="input-container">
          <h3>Ingredients</h3>
          <textarea
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            placeholder="Enter ingredients separated by commas"
            required // Ensure ingredients are required
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
            className="styled-input"
          />
        </div>
        <div className="input-container">
          <h3>Calories</h3>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={calories}
            onChange={(event) => {
              const value = event.target.value;
              if (/^\d*$/.test(value)) {
                // Allow only numbers
                setCalories(value);
              }
            }}
            placeholder="Enter calories"
            className="styled-input"
          />
        </div>
        {/* <div className="input-container">
          <h3>Servings</h3>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={servings}
            onChange={(event) => {
              const value = event.target.value;
              if (/^\d*$/.test(value)) {
                // Allow only numbers
                setServings(value);
              }
            }}
            placeholder="Enter amount of servings per recipe (optional)"
            className="styled-input"
          />
        </div> */}
        <div className="input-container">
          <h3>Prep-time</h3>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={prepTime}
            onChange={(event) => {
              const value = event.target.value;
              if (/^\d*$/.test(value)) {
                // Allow only numbers
                setPrepTime(value);
              }
            }}
            placeholder="Enter prep-time (optional)"
            className="styled-input"
          />
        </div>
        <div className="input-container">
          <h3>Cook-time</h3>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={cookTime}
            onChange={(event) => {
              const value = event.target.value;
              if (/^\d*$/.test(value)) {
                // Allow only numbers
                setCookTime(value);
              }
            }}
            placeholder="Enter cook-time (optional)"
            className="styled-input"
          />
        </div>
        <div className="input-container">
          <h3>Category</h3>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={category}
            onChange={(event) => {
              const value = event.target.value;
              if (/^\d*$/.test(value)) {
                // Allow only numbers
                setCategory(value);
              }
            }}
            placeholder="Choose a category"
            className="styled-input"
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

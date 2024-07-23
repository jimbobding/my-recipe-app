import React, { useState } from "react";
import useRecipeForm from "../hooks/useRecipeForm";
import "../styles/components/_addRecipe.scss";

function AddRecipe() {
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <div className="add-recipe-container">
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <div className="input-container">
          <h3>Title</h3>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="input-container">
          <h3>Ingredients</h3>
          <textarea
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
          />
        </div>
        <div className="input-container">
          <h3>Instructions</h3>
          <textarea
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
          />
        </div>
        <div className="input-container">
          <h3>Description</h3>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="input-container">
          <h3>Image</h3>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {imageUrl && (
          <div className="image-preview">
            <img src={imageUrl} alt="Recipe" />
          </div>
        )}
        <button type="submit" className="add-recipe-submit-btn">
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;

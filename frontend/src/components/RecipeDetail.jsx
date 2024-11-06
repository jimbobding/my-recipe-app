import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipeById } from "../services/api";
import "../styles/components/_recipeDetail.scss";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail-container">
      <div className="recipe-detail">
        <h1 className="recipe-title">{recipe.title}</h1>
        {recipe.image_url && (
          <img
            src={`http://localhost:3002${recipe.image_url}`}
            alt={recipe.title}
            className="recipe-detail-image"
          />
        )}
        <div className="recipe-detail-content">
          <div className="recipe-description">
            <p>
              <strong>Description:</strong>
            </p>
            <p>{recipe.description}</p>
          </div>

          {/* Displaying ingredients with line breaks */}
          <div className="recipe-ingredients">
            <p>
              <strong>Ingredients:</strong>
            </p>
            {recipe.ingredients.split("\n").map((line, index) => (
              <p key={index}>{line}</p> // Each ingredient on a new line
            ))}
          </div>

          {/* Displaying instructions with line breaks */}
          <div className="recipe-instructions">
            <p>
              <strong>Instructions:</strong>
            </p>
            {recipe.instructions.split("\n").map((line, index) => (
              <p key={index}>{line}</p> // Each instruction on a new line
            ))}
          </div>
          <div className="back-btn">
            <Link to="/recipes">Back to recipes</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;

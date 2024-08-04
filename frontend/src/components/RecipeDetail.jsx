import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    <div className="recipe-detail">
      <h1 className="recipe-title">{recipe.title}</h1>
      {recipe.image_url && (
        <img
          src={`http://localhost:3000/uploads/${recipe.image_url.split("/").pop()}`}
          alt={recipe.title}
          className="recipe-detail-image"
        />
      )}
      <div className="recipe-detail-content">
        <p className="recipe-description">
          <strong>Description:</strong> {recipe.description}
        </p>
        <div className="recipe-ingredients">
          <p>
            <strong>Ingredients:</strong> {recipe.ingredients}
          </p>
        </div>
        <div className="recipe-instructions">
          <p>
            <strong>Instructions:</strong> {recipe.instructions}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;

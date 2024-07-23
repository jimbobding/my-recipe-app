import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../services/api";
import { Link } from "react-router-dom";
import "../styles/components/_recipeList.scss";
import "../styles/_variables.scss";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      <h1>Recipe</h1>
      <div className="recipe-list-container">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-list-recipe">
            {recipe.image_url && (
              <div className="recipe-list-item">
                <h3>Image</h3>
                <img
                  src={`http://localhost:3000/uploads/${recipe.image_url.split("/").pop()}`}
                  alt={recipe.title}
                  className="recipe-image"
                />
              </div>
            )}
            <div className="recipe-list-item">
              <h3>Title</h3>
              {recipe.title}
            </div>
            <div className="recipe-list-item">
              <h3>Ingredients</h3>
              {recipe.ingredients}
            </div>
            <div className="recipe-list-item">
              <h3>Instructions</h3>
              {recipe.instructions}
            </div>
            <div className="recipe-list-item">
              <h3>Description</h3>
              {recipe.description}
            </div>
            <Link to={`/edit/${recipe.id}`}>
              <button>Edit</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default RecipeList;

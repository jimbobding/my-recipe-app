import React, { useEffect } from "react";
import { getAllRecipes } from "../services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import your auth context
import "../styles/components/_recipeList.scss"; // Import the styles
import "../styles/_variables.scss";
import useRecipeForm from "../hooks/useRecipeForm";

function RecipeList() {
  const { recipes, setRecipes, handleDelete } = useRecipeForm();
  const { user, isLoggedIn } = useAuth(); // Get user and isLoggedIn from your auth context
  const defaultImage = "/defaultRecipePic/download.jpeg"; // Path for the default image

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
        console.log("Fetched Recipes Data:", data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [setRecipes]);

  return (
    <>
      <h1>Recipes</h1>
      <div className="recipe-list-container">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-list-recipe">
            <div className="recipe-list-item">
              <h3>Image</h3>
              <img
                src={
                  recipe.image_url
                    ? `http://localhost:3002${recipe.image_url}`
                    : defaultImage // Use default image if recipe.image_url is absent
                }
                alt={recipe.title || "Default Recipe"}
                className="recipe-image"
              />
            </div>
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
            <div className="recipe-actions">
              <Link to={`/view-recipe/${recipe.id}`}>
                <button className="recipe-button">View</button>
              </Link>

              {/* Show Edit and Delete buttons only if the logged-in user owns the recipe */}
              {isLoggedIn && user && user.id === recipe.user_id && (
                <>
                  <Link to={`/edit-recipe/${recipe.id}`}>
                    <button className="recipe-button">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="recipe-button delete-button"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default RecipeList;

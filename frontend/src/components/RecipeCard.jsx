import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/components/_recipeCard.scss";

const defaultImage = "/defaultRecipePic/download.jpeg";
const defaultUserImage = "/defaultProfilePic/smiley.jpeg";

function RecipeCard({ recipe, handleDelete, getUserForRecipe }) {
  const { user, isLoggedIn } = useAuth();

  const recipeUser = getUserForRecipe ? getUserForRecipe(recipe.user_id) : null;

  return (
    <div className="recipe-list-recipe">
      <h2 className="recipe-title">{recipe.title}</h2>

      <div className="recipe-list-img">
        <img
          src={
            recipe.image_url
              ? `http://localhost:3002${recipe.image_url}`
              : defaultImage
          }
          alt={recipe.title || "Default Recipe"}
          className="recipe-image"
        />
      </div>
      <div className="recipe-list-item">
        <h3>Ingredients</h3>
        <p>{recipe.ingredients}</p>
      </div>
      <div className="recipe-list-item">
        <h3>Instructions</h3>
        <p>{recipe.instructions}</p>
      </div>
      <div className="recipe-list-item">
        <h3>Description</h3>
        <p>{recipe.description}</p>
      </div>
      {(recipe.calories > 0 ||
        recipe.prep_time > 0 ||
        recipe.servings > 0 ||
        recipe.cook_time > 0) && (
        <div className="recipe-list-item">
          <div className="details-grid">
            {recipe.calories > 0 && (
              <div>
                <h4>Calories</h4>
                <p>{recipe.calories}</p>
              </div>
            )}
            {recipe.prep_time > 0 && (
              <div>
                <h4>Prep Time</h4>
                <p>{recipe.prep_time} minutes</p>
              </div>
            )}
            {recipe.servings > 0 && (
              <div>
                <h4>Servings</h4>
                <p>{recipe.servings}</p>
              </div>
            )}
            {recipe.cook_time > 0 && (
              <div>
                <h4>Cook Time</h4>
                <p>{recipe.cook_time} minutes</p>
              </div>
            )}
          </div>
        </div>
      )}

      {recipeUser && (
        <div className="posted-by">
          <img
            src={recipeUser.image_url || defaultUserImage}
            alt={`${recipeUser.username}'s profile`}
            className="profile-image"
          />
          <p>{recipeUser.username}</p>
        </div>
      )}

      <div className="recipe-actions">
        <Link to={`/view-recipe/${recipe.id}`}>
          <button className="recipe-button">View</button>
        </Link>

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
  );
}

export default RecipeCard;

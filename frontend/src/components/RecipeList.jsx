import React, { useEffect, useState } from "react";
import { getAllRecipes, getAllUsers } from "../services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/components/_recipeList.scss";
import "../styles/_variables.scss";
import useRecipeForm from "../hooks/useRecipeForm";

function RecipeList() {
  const { recipes, setRecipes, handleDelete } = useRecipeForm();
  const { user, isLoggedIn } = useAuth();
  const defaultImage = "/defaultRecipePic/download.jpeg";
  const defaultUserImage = "/defaultProfilePic/smiley.jpeg";
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        console.log("Fetched Users Data:", data); // Log to inspect `image_url` values
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const getUserForRecipe = (recipeUserId) => {
    const user = users.find((user) => String(user.id) === String(recipeUserId));

    if (user) {
      console.log(`User found for recipe ${recipeUserId}:`, user); // Log user data for inspection

      // Check for `null`, `undefined`, or empty string on `image_url`
      const fullImageUrl = user.image_url
        ? `http://localhost:3002/uploads/${encodeURI(user.image_url)}`
        : defaultUserImage; // Fallback to defaultUserImage if `image_url` is missing

      return {
        username: user.username || "Unknown", // Default username if missing
        image_url: fullImageUrl,
      };
    } else {
      // Handle the case where no user is found for `recipeUserId`
      console.warn(`No user found for recipe with user ID: ${recipeUserId}`);
      return { username: "Unknown", image_url: defaultUserImage };
    }
  };

  return (
    <>
      <div className="recipe-list-container">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-list-recipe">
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

            <div className="posted-by">
              {(() => {
                const recipeUser = getUserForRecipe(recipe.user_id);
                console.log("Recipe User object:", recipeUser);

                return (
                  <>
                    <img
                      src={recipeUser.image_url || defaultUserImage}
                      alt={`${recipeUser.username}'s profile`}
                      className="profile-image"
                    />
                    <p>{recipeUser.username}</p>
                  </>
                );
              })()}
            </div>

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
        ))}
      </div>
    </>
  );
}

export default RecipeList;

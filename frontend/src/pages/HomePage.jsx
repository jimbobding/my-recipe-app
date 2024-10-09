import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import { getRecipesByUserId } from "../services/api";
import useRecipeForm from "../hooks/useRecipeForm";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const [user, setUser] = useState(null);
  const defaultImageUrl = "/defaultProfilePic/smiley.jpeg";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored user from localStorage:", storedUser);

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Parsed user object:", parsedUser);
      setUser(parsedUser);
    }
  }, [isLoggedIn]);

  const { recipes, setRecipes, handleDelete } = useRecipeForm();

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        // Ensure the user is logged in and has an ID
        if (user && user.id) {
          const data = await getRecipesByUserId(user.id); // Fetch recipes by the user's ID
          setRecipes(data);
          console.log("Fetched Recipes Data for User:", data);
        }
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };

    fetchUserRecipes();
  }, [user, setRecipes]);

  // Use the image URL from the user object or fall back to a default image
  const imageUrl = user?.image_url || defaultImageUrl;

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {isLoggedIn && user ? (
        <>
          <p>Welcome back, {user.username}!</p>
          <p>Weight: {user.weight}</p>
          <img
            src={imageUrl}
            alt={`${user.username}'s avatar`}
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
          <div className="recipe-list-container">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-list-recipe">
                {recipe.image_url && (
                  <div className="recipe-list-item">
                    <h3>Image</h3>
                    <img
                      src={`http://localhost:3002${recipe.image_url}`}
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
                <div className="recipe-actions">
                  <Link to={`/edit-recipe/${recipe.id}`}>
                    <button className="recipe-button">Edit</button>
                  </Link>
                  <Link to={`/view-recipe/${recipe.id}`}>
                    <button className="recipe-button">View</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="recipe-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No user is currently logged in.</p>
      )}
    </div>
  );
};

export default HomePage;

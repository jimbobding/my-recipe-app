import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getRecipesByUserId } from "../services/api";
import useRecipeForm from "../hooks/useRecipeForm";
import { Link } from "react-router-dom";
import "../styles/components/_profilePage.scss";

const HomePage = () => {
  const { isLoggedIn, user: authUser } = useAuth(); // Get user directly from AuthContext
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Manage loading state
  const defaultImageUrl = "/defaultProfilePic/smiley.jpeg";

  const { recipes, setRecipes, handleDelete } = useRecipeForm();

  // Load user from AuthContext and stop loading when user is set
  useEffect(() => {
    if (isLoggedIn && authUser) {
      setUser(authUser);
      setLoading(false); // Only set loading to false once the user is fetched
    }
  }, [isLoggedIn, authUser]);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (user && user.id) {
        try {
          const data = await getRecipesByUserId(user.id);
          setRecipes(data);
          console.log("Fetched Recipes Data for User:", data);
        } catch (error) {
          console.error("Error fetching user recipes:", error);
        }
      }
    };

    fetchUserRecipes();
  }, [user, setRecipes]);

  const imageUrl = user?.image_url || defaultImageUrl;

  if (loading) {
    return <p>Loading...</p>; // Show a loading message or spinner
  }

  return (
    <div className="homepage-container">
      <div class="clamped-text"></div>
      {user && <h1>Hello {user.username}</h1>}
      {isLoggedIn && user ? (
        <>
          <img
            className="user-avtar"
            src={imageUrl}
            alt={`${user.username}'s avatar`}
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
          <h2>{user.username}'s Recipes</h2>
          <div className="recipe-list-container">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-list-recipe">
                {recipe.image_url && (
                  <div className="recipe-list-img">
                    <img
                      src={`http://localhost:3002${recipe.image_url}`}
                      alt={recipe.title}
                      className="recipe-image"
                    />
                  </div>
                )}
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
                <div className="recipe-actions">
                  <Link to={`/edit-recipe/${recipe.id}`}>
                    <button className="recipe-button">Edit</button>
                  </Link>
                  <Link to={`/view-recipe/${recipe.id}`}>
                    <button className="recipe-button">View</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="recipe-button delete-button"
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

import axios from "axios";

// Set the base URL for your backend API
const API_URL = "http://localhost:3000/api";

// Function to get all recipes
export const getAllRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/recipes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

// Function to add a new recipe, accepting FormData
export const addRecipe = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/recipes`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding recipe:", error);
    throw error;
  }
};

// Function to get a recipe by ID
export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

// Function to update a recipe, accepting FormData
export const updateRecipe = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/recipes/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};

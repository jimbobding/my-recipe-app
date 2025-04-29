import axios from "axios";

// Dynamically set API base URL based on environment
export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3002/api";

console.log("Current API URL:", API_URL);
console.log("Environment:", process.env.NODE_ENV);
console.log("API URL from .env:", process.env.REACT_APP_API_URL);

// Function to get all recipes

export const getAllRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/recipes`);
    if (!response.data) throw new Error("Empty response from server");
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return []; // Return an empty array to prevent frontend crashes
  }
};

export const addRecipe = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("You must be logged in to add a recipe.");

    const response = await axios.post(`${API_URL}/recipes`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in addRecipe:", error);
    handleApiError(error);
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

export const getRecipesByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes by user:", error);
    throw error;
  }
};

export const updateRecipe = async (id, formData, token) => {
  try {
    const response = await axios.put(`${API_URL}/recipes/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};

export const deleteRecipe = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const createUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 403) {
      throw new Error("Authorization failed. Please log in again.");
    }
    throw new Error(
      `Server error: ${error.response.data.message || "Request failed."}`
    );
  } else if (error.request) {
    throw new Error(
      "No response from the server. Check your network connection."
    );
  } else {
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

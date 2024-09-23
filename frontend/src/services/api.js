import axios from "axios";

// Set the base URL for your backend API
export const API_URL = "http://localhost:3002/api";

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

export const addRecipe = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/recipes`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("addRecipe successful response:", response); // Debugging success
    return response.data; // Success case, returns the recipe data
  } catch (error) {
    console.error("Error in addRecipe:", error); // Log the error

    if (error.response) {
      // Server responded with an error status code
      console.log("Server error:", error.response);
      throw new Error(
        `Server error: ${error.response.data.message || "Failed to add recipe."}`
      );
    } else if (error.request) {
      // No response received (e.g., network failure, CORS issue, server down)
      console.log("Network error:", error.request);
      throw new Error(
        "No response from server. Please check your network connection."
      );
    } else {
      // Other unknown error
      console.log("Unexpected error:", error.message);
      throw new Error("An unexpected error occurred. Please try again.");
    }
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

// Function to delete a recipe by ID
export const deleteRecipe = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};

//function to get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

//function to get user by id
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

//function to create a user
export const createUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

//function to update a user
export const updateUser = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

//function to delete a user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

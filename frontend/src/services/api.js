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
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
    console.log("Authorization token:", token); // Log the token for debugging

    // If the token is missing, show an error message
    if (!token) {
      console.error("Authorization token is missing.");
      throw new Error("You must be logged in to add a recipe.");
    }

    // Send the POST request to add a recipe
    const response = await axios.post(`${API_URL}/recipes`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the headers
        "Content-Type": "multipart/form-data", // Use the correct content type
      },
    });

    console.log("addRecipe successful response:", response); // Log successful response
    return response.data; // Return the response if the request was successful
  } catch (error) {
    console.error("Error in addRecipe:", error); // Log any error that occurs

    // Check if the error comes from the server (i.e., server responded with an error status)
    if (error.response) {
      const status = error.response.status;

      // Handle authorization errors (if token is invalid or expired)
      if (status === 403) {
        console.error("Authorization failed. Token may be expired or invalid.");
        throw new Error("Authorization failed. Please log in again.");
      }

      // Handle other server-side errors
      throw new Error(
        `Server error: ${error.response.data.message || "Failed to add recipe."}`
      );
    } else if (error.request) {
      // If no response is received from the server (network error)
      console.error("Network error:", error.request);
      throw new Error(
        "No response from the server. Please check your network connection."
      );
    } else {
      // Other unexpected errors
      console.error("Unexpected error:", error.message);
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

// Function to get all recipes by a specific user ID
export const getRecipesByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes by user:", error);
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

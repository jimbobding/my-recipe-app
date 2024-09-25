import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeById,
} from "../services/api";

function useRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      const response = await addRecipe(formData); // Make sure you await the response

      console.log("Recipe added successfully in handleSubmit:", response); // For debugging
      return response; // Return the response if successful
    } catch (error) {
      console.error("Error in handleSubmit:", error); // Log the error

      throw error; // Rethrow the error so handleFormSubmit can catch it
    }
  };

  const handleEdit = async (id) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const updatedRecipe = await updateRecipe(id, formData);
      setRecipes(
        recipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
      );
      console.log("Recipe updated successfully:", updatedRecipe);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
      console.log("Recipe deleted successfully");
      console.log(handleDelete);
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  const handleGetRecipeById = async (id) => {
    try {
      const recipe = await getRecipeById(id);
      setTitle(recipe.title);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instructions);
      setDescription(recipe.description);
      setImageUrl(recipe.imageUrl);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  return {
    title,
    ingredients,
    instructions,
    description,
    image,
    imageUrl,
    recipes,
    setTitle,
    setIngredients,
    setInstructions,
    setDescription,
    setImage,
    setRecipes,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleGetRecipeById,
  };
}

export default useRecipeForm;

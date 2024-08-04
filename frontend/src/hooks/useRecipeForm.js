// import { useState } from "react";
// import axios from "axios";

// function useRecipeForm() {
//   const [title, setTitle] = useState("");
//   const [ingredients, setIngredients] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");
//   const [recipes, setRecipes] = useState([]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("ingredients", ingredients);
//     formData.append("instructions", instructions);
//     formData.append("description", description);
//     if (image) {
//       formData.append("image", image);
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/recipes",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Recipe added successfully:", response.data);
//       setImageUrl(response.data.imageUrl);
//       // Optionally, reset the form fields
//       setTitle("");
//       setIngredients("");
//       setInstructions("");
//       setDescription("");
//       setImage(null);
//     } catch (error) {
//       console.error("Error adding recipe:", error);
//     }
//   };

//   const handleEdit = async (id) => {
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("ingredients", ingredients);
//     formData.append("instructions", instructions);
//     formData.append("description", description);
//     if (image) {
//       formData.append("image", image);
//     }
//     console.log("FormData entries:", formData.entries());
//     try {
//       await axios.put(`http://localhost:3000/api/recipes/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//     } catch (error) {
//       console.error("Error updating recipe:", error);
//     }
//   };

//   const handleDelete = (id) => {
//     fetch(`http://localhost:3000/api/recipes/${id}`, { method: "DELETE" })
//       .then((response) => {
//         if (!response.ok) {
//           return response.text().then((text) => {
//             throw new Error(`HTTP error! Status: ${response.status}, ${text}`);
//           });
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // Handle success
//         console.log(data);
//         setRecipes(recipes.filter((recipe) => recipe.id !== id));
//       })
//       .catch((error) => {
//         console.error("Failed to delete recipe:", error);
//       });
//   };

//   return {
//     title,
//     ingredients,
//     instructions,
//     description,
//     image,
//     imageUrl,
//     recipes,
//     setTitle,
//     setIngredients,
//     setInstructions,
//     setDescription,
//     setImage,
//     setRecipes,
//     handleSubmit,
//     handleEdit,
//     handleDelete,
//   };
// }

// export default useRecipeForm;
import { useState } from "react";
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const data = await addRecipe(formData);
      console.log("Recipe added successfully:", data);
      setImageUrl(data.imageUrl);
      setRecipes([...recipes, data]);
      // Optionally, reset the form fields
      setTitle("");
      setIngredients("");
      setInstructions("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error adding recipe:", error);
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

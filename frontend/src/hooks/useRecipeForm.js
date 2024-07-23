import { useState } from "react";
import axios from "axios";

function useRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

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
      const response = await axios.post(
        "http://localhost:3000/api/recipes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Recipe added successfully:", response.data);
      setImageUrl(response.data.imageUrl);
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
    console.log("FormData entries:", formData.entries());
    try {
      await axios.put(`http://localhost:3000/api/recipes/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return {
    title,
    ingredients,
    instructions,
    description,
    image,
    imageUrl,
    setTitle,
    setIngredients,
    setInstructions,
    setDescription,
    setImage,
    handleSubmit,
    handleEdit,
  };
}

export default useRecipeForm;

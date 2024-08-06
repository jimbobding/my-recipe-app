import { useState } from "react";
import {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../services/api";

function useUserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("weight", weight);
    if (image) {
      formData.append("image", image);
    }

    try {
      const data = await createUser(formData);
      console.log("User created successfully:", data);
      setImageUrl(data.imageUrl);
      setUsers([...users, data]);
      // Optionally, reset the form fields
      setUsername("");
      setPassword("");
      setWeight("");
      setImage(null);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleEdit = async (id) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("weight", weight);
    if (image) {
      formData.append("image", image);
    }

    try {
      const updatedUser = await updateUser(id, formData);
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
      console.log("User updated successfully:", updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleGetUserById = async (id) => {
    try {
      const user = await getUserById(id);
      setUsername(user.username);
      setPassword(user.password);
      setWeight(user.weight);
      setImageUrl(user.imageUrl);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return {
    username,
    password,
    weight,
    image,
    imageUrl,
    users,
    setUsername,
    setPassword,
    setWeight,
    setImage,
    setUsers,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleGetUserById,
  };
}

export default useUserForm;

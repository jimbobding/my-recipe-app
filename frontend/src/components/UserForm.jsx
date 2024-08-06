import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services/api";

const UserForm = ({ userId, onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsEditing(true);
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${API_URL}/users/${userId}`);
          const user = response.data;
          setUsername(user.username);
          setWeight(user.weight);
          // Handle image URL if needed
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      fetchUser();
    }
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("weight", weight);
    if (image) formData.append("image", image);

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/users/${userId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("User updated successfully!");
      } else {
        await axios.post(`${API_URL}/users`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("User created successfully!");
      }
      if (onSuccess) onSuccess(); // Callback to handle success
    } catch (error) {
      console.error("Error submitting user:", error);
      alert("Failed to submit user.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button type="submit">{isEditing ? "Update" : "Sign Up"}</button>
    </form>
  );
};

export default UserForm;

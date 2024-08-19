import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/components/_userForm.scss";

const UserForm = ({ userId, onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (userId) {
      setIsEditing(true);
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${API_URL}/users/${userId}`);
          const user = response.data;
          setUsername(user.username);
          setWeight(user.weight);
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
      const response = isEditing
        ? await axios.put(`${API_URL}/users/${userId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await axios.post(`${API_URL}/users`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      const { message, user, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update context with new user and token
      login(user, token);

      navigate("/");

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(
        "Error submitting user:",
        error.response ? error.response.data : error.message
      );
      alert(error.response ? error.response.data : "Failed to submit user.");
    }
  };

  return (
    <div className="user-form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="user-form__input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="user-form__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="number"
          className="user-form__input"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <input
          type="file"
          className="user-form__file-input"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file-input" className="user-form__file-label">
          Choose file
        </label>

        <button type="submit" className="user-form__button">
          {isEditing ? "Update" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;

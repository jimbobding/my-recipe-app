import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import
import "../styles/components/_loginForm.scss";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting login with:", { username, password }); // Debugging log
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, {
        username,
        password,
      });
      const { user, token } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      console.log("Login response user:", JSON.stringify(user), token);

      login(user, token); // Update context state
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-form">
      <h2 className="login-form__title">Login</h2>
      <form className="login-form__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="login-form__input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="login-form__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-form__button">
          Login
        </button>
      </form>
      {error && <p className="login-form__error">{error}</p>}
    </div>
  );
};

export default LoginForm;

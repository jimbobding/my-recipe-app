import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login method from AuthContext

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

      login(user); // Update context state
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Login error:", err); // Debugging log
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
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
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginForm;

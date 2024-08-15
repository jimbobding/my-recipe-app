// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import "../styles/components/_navbar.scss";

function Navbar() {
  const { isLoggedIn, logout } = useAuth(); // Use Auth context to get login state

  // Optional: Use useEffect to handle side effects if needed
  // React.useEffect(() => {
  //   // You can use this to perform side effects if necessary
  // }, [isLoggedIn]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">My Recipes App</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <Link to="/add-recipe">Add Recipe</Link>
        </li>
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <li>
            <button
              onClick={() => {
                logout(); // Call logout from context
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

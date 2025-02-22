// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import "../styles/components/_navbar.scss";

function Navbar() {
  const { isLoggedIn, logout } = useAuth(); // Use Auth context to get login state

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Jimmy's Recipe Bizzzoookkk</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <Link to="/unit-converter">Converter</Link>
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
          <ul>
            <li>
              <Link to="/add-recipe">Add Recipe</Link>
            </li>
            <li>
              <button
                className="logout-button"
                onClick={() => {
                  logout(); // Call logout from context
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

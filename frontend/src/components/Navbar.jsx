import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/_navbar.scss";

function Navbar() {
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
      </ul>
    </nav>
  );
}

export default Navbar;

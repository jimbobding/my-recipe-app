import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddRecipePage from "./pages/AddRecipesPage";
import RecipeListPage from "./pages/RecipeListPage";
import EditRecipePage from "./pages/EditRecipePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
          <Route path="/recipes" element={<RecipeListPage />} />
          <Route path="/edit/:id" element={<EditRecipePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

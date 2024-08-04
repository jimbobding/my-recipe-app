import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddRecipePage from "./pages/AddRecipesPage";
import RecipeListPage from "./pages/RecipeListPage";
import EditRecipePage from "./pages/EditRecipePage";
import RecipeDetail from "./components/RecipeDetail";
import Navbar from "./components/Navbar";
import AddUser from "./components/AddUser";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/recipes" element={<RecipeListPage />} />
          <Route path="/edit/:id" element={<EditRecipePage />} />
          <Route path="/view/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import "./styles/global.scss";
import { Route, Routes } from "react-router-dom"; // No BrowserRouter here
import ProfilePage from "./components/ProfilePage";
import AddRecipePage from "./pages/AddRecipesPage";
import RecipeListPage from "./pages/RecipeListPage";
import EditRecipePage from "./pages/EditRecipePage";
import RecipeDetail from "./components/RecipeDetail";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import LoginForm from "./components/LoginForm";
import UnitConverter from "./components/UnitConverter";
// import { useAuth } from "./context/AuthContext";
import useAutoLogout from "./hooks/useAutoLogout";

// import RegisterForm from "./components/RegisterForm";

function App() {
  // Always call the hook regardless of login status
  useAutoLogout(3600000);

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/recipes" element={<RecipeListPage />} />
        <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
        <Route path="/view-recipe/:id" element={<RecipeDetail />} />
        <Route path="/add-user" element={<UserForm />} />
        <Route path="/login" element={<LoginForm />} />\{" "}
        <Route path="/register" element={<UserForm />} />
        <Route path="/unit-converter" element={<UnitConverter />} />
      </Routes>
    </div>
  );
}

export default App;

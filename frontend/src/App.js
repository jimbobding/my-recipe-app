// import "./App.css";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import AddRecipePage from "./pages/AddRecipesPage";
// import RecipeListPage from "./pages/RecipeListPage";
// import EditRecipePage from "./pages/EditRecipePage";
// import RecipeDetail from "./components/RecipeDetail";
// import Navbar from "./components/Navbar";
// import AddUser from "./components/UserForm";
// import AddUserPage from "./pages/AddUserPage";
// import EditUserPage from "./pages/EditUserPage";

// function App() {
//   return (
//     <Router>
//       <div className="app-container">
//         <Navbar />

//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/add-recipe" element={<AddRecipePage />} />
//           <Route path="/add-user" element={<AddUser />} />
//           <Route path="/recipes" element={<RecipeListPage />} />
//           <Route path="/edit/:id" element={<EditRecipePage />} />
//           <Route path="/view/:id" element={<RecipeDetail />} />
//           <Route path="/add" component={AddUserPage} />
//           <Route path="/edit/:id" component={EditUserPage} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import "./App.css";
import { Route, Routes } from "react-router-dom"; // No BrowserRouter here
import HomePage from "./pages/HomePage";
import AddRecipePage from "./pages/AddRecipesPage";
import RecipeListPage from "./pages/RecipeListPage";
import EditRecipePage from "./pages/EditRecipePage";
import RecipeDetail from "./components/RecipeDetail";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import LoginForm from "./components/LoginForm";
// import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/recipes" element={<RecipeListPage />} />
        <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
        <Route path="/view-recipe/:id" element={<RecipeDetail />} />
        <Route path="/add-user" element={<UserForm />} />
        <Route path="/login" element={<LoginForm />} />\{" "}
        <Route path="/register" element={<UserForm />} />
      </Routes>
    </div>
  );
}

export default App;

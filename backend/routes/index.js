// routes/index.js

const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes");

// Routes for recipes
router.get("/api/recipes", recipesController.getAllRecipes);
router.get("/api/recipes/:id", recipesController.getRecipeById);
router.post("/api/recipes", recipesController.createRecipe);
router.put("/api/recipes/:id", recipesController.updateRecipe);
router.delete("/api/recipes/:id", recipesController.deleteRecipe);

module.exports = router;

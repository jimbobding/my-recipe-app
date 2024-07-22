const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes");
const upload = require("../multer-config");

// Routes for recipes
router.get("/api/recipes", recipesController.getAllRecipes);
router.get("/api/recipes/:id", recipesController.getRecipeById);
router.post(
  "/api/recipes",
  upload.single("image"),
  recipesController.createRecipe
);
router.put(
  "/api/recipes/:id",
  upload.single("image"),
  recipesController.updateRecipe
);
router.delete("/api/recipes/:id", recipesController.deleteRecipe);

module.exports = router;

const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const multer = require("multer");
const path = require("path");

// Middleware for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define routes
router.get("/recipes", recipeController.getAllRecipes);
router.get("/recipes/:id", recipeController.getRecipeById);
router.post("/recipes", upload.single("image"), recipeController.createRecipe);
router.put(
  "/recipes/:id",
  upload.single("image"),
  recipeController.updateRecipe
);
router.delete("/recipes/:id", recipeController.deleteRecipe);
router.post(
  "/upload-image",
  upload.single("image"),
  recipeController.uploadImage
);

module.exports = router;

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
// Updated route paths to match the new server setup
router.get("/", recipeController.getAllRecipes); // GET /api/recipes
router.get("/:id", recipeController.getRecipeById); // GET /api/recipes/:id
router.post("/", upload.single("image"), recipeController.createRecipe); // POST /api/recipes
router.put("/:id", upload.single("image"), recipeController.updateRecipe); // PUT /api/recipes/:id
router.delete("/:id", recipeController.deleteRecipe); // DELETE /api/recipes/:id

// Optional route for uploading images if needed separately
router.post(
  "/upload-image",
  upload.single("image"),
  recipeController.uploadImage
);

module.exports = router;

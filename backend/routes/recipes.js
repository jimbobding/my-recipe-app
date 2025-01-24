const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const multer = require("multer");
const path = require("path");
const authenticateJWT = require("../middleware/authenticateJWT"); // Import your middleware

console.log("Controller:", recipeController);
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
router.get("/", recipeController.getAllRecipes); // GET /api/recipes
router.get("/:id", recipeController.getRecipeById); // GET /api/recipes/:id
router.get("/user/:userId", recipeController.getRecipesByUserId); // GET /api/recipes/user/:userId
router.post(
  "/",
  upload.single("image"),
  authenticateJWT,
  recipeController.createRecipe
); // POST /api/recipes (auth required)
router.put(
  "/:id",
  upload.single("image"),
  authenticateJWT,
  recipeController.updateRecipe
); // PUT /api/recipes/:id (auth required)
router.delete("/:id", recipeController.deleteRecipe); // DELETE /api/recipes/:id (auth required)

module.exports = router;

const recipeModel = require("../models/recipe");
const multer = require("multer");
const path = require("path");

// Define multer storage configuration for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Controller methods
exports.getAllRecipes = (req, res) => {
  recipeModel.getAllRecipes((err, results) => {
    if (err) {
      console.error("Error fetching recipes:", err);
      return res.status(500).send("Error fetching recipes");
    }

    res.json(results);
  });
};

exports.getRecipeById = (req, res) => {
  const id = req.params.id;
  recipeModel.getRecipeById(id, (err, results) => {
    if (err) {
      console.error("Error fetching recipe:", err);
      return res.status(500).send("Error fetching recipe");
    }
    if (results.length === 0) {
      return res.status(404).send("Recipe not found");
    }
    console.log("Fetched Recipe by ID:", results[0]);
    res.json(results[0]);
  });
};

// Fetch all recipes by userId
exports.getRecipesByUserId = (req, res) => {
  const userId = req.params.userId; // Get the userId from the request parameters

  recipeModel.getRecipesByUserId(userId, (err, results) => {
    if (err) {
      console.error("Error fetching user recipes:", err);
      return res.status(500).json({ message: "Failed to fetch user recipes." });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No recipes found for this user." });
    }

    res.status(200).json(results); // Return the recipes
  });
};

exports.createRecipe = (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    calories,
    prep_time,
    cook_time,
    servings,
    category,
  } = req.body;

  const image_url = req.file
    ? req.file.path.replace(
        "/Users/jamesdavid/Desktop/my-recipe-app/backend/uploads",
        "/uploads"
      )
    : null;

  const userId = req.user ? req.user.id : null;

  // Validate and sanitize inputs
  const recipeData = {
    title: title || "Untitled",
    description: description || "",
    ingredients: ingredients || "",
    instructions: instructions || "",
    calories: parseInt(calories, 10) || 0, // Convert to number
    prep_time: parseInt(prep_time, 10) || 0,
    cook_time: parseInt(cook_time, 10) || 0,
    servings: parseInt(servings, 10) || 0,
    category: category || "Uncategorized",
    image_url,
    userId,
  };

  if (!userId) {
    return res.status(400).send("User ID is required.");
  }

  recipeModel.createRecipe(recipeData, (err, result) => {
    if (err) {
      console.error("Error creating recipe:", err);
      return res.status(500).send("Error creating recipe");
    }
    res.status(201).json({
      message: "Recipe created successfully",
      id: result.insertId,
      imageUrl: image_url,
    });
  });
};

exports.updateRecipe = (req, res) => {
  const id = req.params.id;

  console.log("Incoming Recipe ID:", id); // Log ID
  console.log("Request Body:", req.body); // Log raw request body

  const {
    title,
    description,
    ingredients,
    instructions,
    calories,
    prep_time,
    cook_time,
    servings,
    category,
  } = req.body;

  // Sanitize and validate input
  const sanitizedCalories = parseInt(calories, 10) || 0;
  const sanitizedPrepTime = parseInt(prep_time, 10) || 0;
  const sanitizedCookTime = parseInt(cook_time, 10) || 0;
  const sanitizedServings = parseInt(servings, 10) || 0;

  const sanitizedRecipeData = {
    title: title || "Untitled",
    description: description || "",
    ingredients: ingredients || "",
    instructions: instructions || "",
    image_url: req.file
      ? req.file.path.replace(
          "/Users/jamesdavid/Desktop/my-recipe-app/backend/uploads",
          "/uploads"
        )
      : null,
    calories: sanitizedCalories,
    prep_time: sanitizedPrepTime,
    cook_time: sanitizedCookTime,
    servings: sanitizedServings,
    category: category || "Uncategorized",
  };

  console.log("Sanitized Recipe Data:", sanitizedRecipeData); // Log sanitized data

  // Call the model function with validated data
  recipeModel.updateRecipe(id, sanitizedRecipeData, (err) => {
    if (err) {
      console.error("Error updating recipe:", err); // Log full error
      return res.status(500).send("Error updating recipe");
    }
    res.status(200).json({ message: "Recipe updated successfully" });
  });
};

exports.deleteRecipe = (req, res) => {
  const id = req.params.id;
  recipeModel.deleteRecipe(id, (err, result) => {
    if (err) {
      console.error("Error deleting recipe:", err);
      return res.status(500).send("Error deleting recipe");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Recipe not found");
    }
    res.json({ message: "Recipe deleted successfully" });
  });
};

exports.uploadImage = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res.status(500).json({ message: "Error uploading image" });
    } else if (err) {
      console.error("Unknown error:", err);
      return res.status(500).json({ message: "Unknown error uploading image" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const imageUrl = req.file
      ? req.file.path.replace(
          "/Users/jamesdavid/Desktop/my-recipe-app/backend/uploads",
          "/uploads"
        )
      : null;
    const { recipeId } = req.body;
    const sql = `UPDATE recipes SET image_url = ? WHERE id = ?`;
    const values = [imageUrl, recipeId];

    recipeModel.updateRecipe(recipeId, { image_url: imageUrl }, (err) => {
      if (err) {
        console.error("Error updating image URL:", err);
        return res.status(500).json({ message: "Failed to update image URL" });
      }
      res.status(201).json({ imageUrl: imageUrl });
    });
  });
};

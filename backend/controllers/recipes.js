const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Get all recipes
exports.getAllRecipes = (req, res) => {
  db.query("SELECT * FROM recipes", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).send("Error fetching recipes");
      return;
    }
    res.json(results);
  });
};

// Get recipe by ID
exports.getRecipeById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM recipes WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).send("Error fetching recipe");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("Recipe not found");
      return;
    }
    res.json(results[0]);
  });
};

// Update recipe by ID
exports.updateRecipe = (req, res) => {
  const { title, description, ingredients, instructions } = req.body;
  const image_url = req.file ? req.file.path : null;

  let query =
    "UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ?";
  const values = [title, description, ingredients, instructions];

  if (image_url) {
    query += ", image_url = ?";
    values.push(image_url);
  }

  query += " WHERE id = ?";
  values.push(req.params.id);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack); // Log error
      res.status(500).send("Error updating recipe");
      return;
    }

    res.status(200).json({ message: "Recipe updated successfully" });
  });
};

// Create a new recipe
exports.createRecipe = (req, res) => {
  const { title, description, ingredients, instructions } = req.body;
  const image_url = req.file ? req.file.path : null; // Use req.file.path to get the URL

  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);

  const query =
    "INSERT INTO recipes (title, description, ingredients, instructions, image_url) VALUES (?, ?, ?, ?, ?)";

  db.query(
    query,
    [title, description, ingredients, instructions, image_url],
    (err, result) => {
      if (err) {
        console.error("Error executing MySQL query: " + err.stack);
        res.status(500).send("Error creating recipe");
        return;
      }

      res
        .status(201)
        .json({ message: "Recipe created successfully", id: result.insertId });
    }
  );
};

// Delete recipe by ID
exports.deleteRecipe = (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM recipes WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).send("Error deleting recipe");
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send("Recipe not found");
      return;
    }

    res.json({ message: "Recipe deleted successfully" });
  });
};

// Upload image for a recipe
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

    const imageUrl = req.file.path; // Path where the image is stored (backend/uploads/...)
    const { recipeId } = req.body; // Assuming you send recipeId from frontend
    const sql = `UPDATE recipes SET image_url = ? WHERE id = ?`;
    const values = [imageUrl, recipeId];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error updating image URL:", err);
        return res.status(500).json({ message: "Failed to update image URL" });
      }
      console.log("Image URL updated successfully");
      res.status(201).json({ imageUrl: imageUrl });
    });
  });
};

// module.exports = router;

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
    res.json(results[0]);
  });
};

exports.createRecipe = (req, res) => {
  const { title, description, ingredients, instructions } = req.body;
  const image_url = req.file ? req.file.path : null;
  console.log("Request Body:", req.body);
  console.log("Uploaded File Path:", image_url);
  const recipeData = {
    title,
    description,
    ingredients,
    instructions,
    image_url,
  };

  recipeModel.createRecipe(recipeData, (err, result) => {
    if (err) {
      console.error("Error creating recipe:", err);
      return res.status(500).send("Error creating recipe");
    }
    res.status(201).json({
      message: "Recipe created successfully",
      id: result.insertId,
      imageUrl: image_url, // Include the image URL in the response
    });
  });
};

exports.updateRecipe = (req, res) => {
  const id = req.params.id;
  const { title, description, ingredients, instructions } = req.body;
  const image_url = req.file ? req.file.path : null;

  const recipeData = {
    title,
    description,
    ingredients,
    instructions,
    image_url,
  };

  recipeModel.updateRecipe(id, recipeData, (err) => {
    if (err) {
      console.error("Error updating recipe:", err);
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

    const imageUrl = req.file.path;
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

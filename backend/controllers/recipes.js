const db = require("../db");

// Controller methods
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

exports.updateRecipe = (req, res) => {
  const id = req.params.id;
  const { title, description, ingredients, instructions } = req.body;

  // Validate incoming data (optional)

  const query =
    "UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ? WHERE id = ?";

  db.query(
    query,
    [title, description, ingredients, instructions, id],
    (err, result) => {
      if (err) {
        console.error("Error executing MySQL query: " + err.stack);
        res.status(500).send("Error updating recipe");
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).send("Recipe not found");
        return;
      }

      res.json({ message: "Recipe updated successfully" });
    }
  );
};

exports.createRecipe = (req, res) => {
  const { title, description, ingredients, instructions } = req.body;

  // Validate incoming data (optional)

  const query =
    "INSERT INTO recipes (title, description, ingredients, instructions) VALUES (?, ?, ?, ?)";

  db.query(
    query,
    [title, description, ingredients, instructions],
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

// Implement other CRUD operations (getRecipeById, createRecipe, updateRecipe, deleteRecipe)

const db = require("../db");

const getAllRecipes = (callback) => {
  db.query("SELECT * FROM recipes", callback);
};

const getRecipeById = (id, callback) => {
  db.query("SELECT * FROM recipes WHERE id = ?", [id], callback);
};

const createRecipe = (recipeData, callback) => {
  const { title, description, ingredients, instructions, image_url } =
    recipeData;
  const query =
    "INSERT INTO recipes (title, description, ingredients, instructions, image_url) VALUES (?, ?, ?, ?, ?)";
  console.log("Executing Query:", query);
  console.log("Parameters:", [
    title,
    description,
    ingredients,
    instructions,
    image_url,
  ]);

  db.query(
    query,
    [title, description, ingredients, instructions, image_url],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
      }
      callback(err, results);
    }
  );
};

const updateRecipe = (id, recipeData, callback) => {
  const { title, description, ingredients, instructions, image_url } =
    recipeData;
  let query =
    "UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ?";
  const values = [title, description, ingredients, instructions];

  if (image_url) {
    query += ", image_url = ?";
    values.push(image_url);
  }

  query += " WHERE id = ?";
  values.push(id);

  db.query(query, values, callback);
};

const deleteRecipe = (id, callback) => {
  db.query("DELETE FROM recipes WHERE id = ?", [id], callback);
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};

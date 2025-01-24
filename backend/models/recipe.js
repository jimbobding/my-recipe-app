const db = require("../db");

const getAllRecipes = (callback) => {
  db.query("SELECT * FROM recipes", callback);
};

const getRecipeById = (id, callback) => {
  db.query("SELECT * FROM recipes WHERE id = ?", [id], callback);
};

const getRecipesByUserId = (userId, callback) => {
  db.query("SELECT * FROM recipes WHERE user_id = ?", [userId], callback);
};

const createRecipe = (recipeData, callback) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    calories,
    prep_time,
    cook_time,
    category,
    image_url,
    servings = 0, // Default to 1 if servings is not provided
    userId,
  } = recipeData;

  console.log("Creating recipe with data:", recipeData);

  const query = `
    INSERT INTO recipes (title, description, ingredients, instructions, calories, prep_time, cook_time, category, image_url, servings, user_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      title,
      description,
      ingredients,
      instructions,
      calories,
      prep_time,
      cook_time,
      category,
      image_url,
      servings,
      userId,
    ],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return callback(err, null);
      }
      callback(null, results);
    }
  );
};

const updateRecipe = (id, recipeData, callback) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    calories,
    prep_time,
    cook_time,
    category,
    image_url,
  } = recipeData;
  let query =
    "UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ?, calories = ?, prep_time = ?, cook_time = ?, category = ?";
  const values = [
    title,
    description,
    ingredients,
    instructions,
    calories,
    prep_time,
    cook_time,
    category,
  ];

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
  getRecipesByUserId,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};

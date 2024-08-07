const db = require("../db");

const getAllUsers = (callback) => {
  db.query("SELECT * FROM users", callback);
};

const getUserById = (id, callback) => {
  db.query("SELECT * FROM users WHERE id = ?", [id], callback);
};

const createUser = (username, password, image_url, weight, callback) => {
  const query =
    "INSERT INTO users (username, password, image_url, weight) VALUES (?, ?, ?, ?)";
  console.log("Executing Query:", query);
  console.log("Parameters:", [username, password, image_url, weight]);

  db.query(query, [username, password, image_url, weight], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return callback(err);
    }
    callback(null, results);
  });
};

const updateUser = (id, userData, callback) => {
  const { username, password, image_url, weight } = userData;
  let query = "UPDATE users SET username = ?,  password = ?,  weight = ? ";
  const values = [username, password, weight];

  if (image_url) {
    query += ", image_url = ?";
    values.push(image_url);
  }

  query += " WHERE id = ?";
  values.push(id);

  db.query(query, values, callback);
};

const deleteUser = (id, callback) => {
  db.query("DELETE FROM users WHERE id = ?", [id], callback);
};

const findByUsername = (username, callback) => {
  db.query("SELECT * FROM users WHERE username = ?", [username], callback);
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
  findByUsername,
};

const e = require("express");
const usersModel = require("../models/users");
const path = require("path");

exports.createUser = (req, res) => {
  const { username, password, weight } = req.body;
  const image_url = req.file ? req.file.path : null;
  console.log("Request Body:", req.body);
  console.log("Uploaded File Path:", image_url);
  usersModel.createUser(
    username,
    password,
    image_url,
    weight,
    (err, results) => {
      if (err) {
        console.error("Error creating user:", err);
        return res.status(500).send("Error creating user");
      }
      res.status(201).json({
        message: "User created successfully",
        id: results.insertId,
        imageUrl: image_url, // Include the image URL in the response
      });
    }
  );
};

exports.getAllUsers = (req, res) => {
  usersModel.getAllUsers((err, results) => {
    if (err) {
      console.error("Error fetching users:", err); // Updated error message
      return res.status(500).send("Error fetching users"); // Updated error message
    }
    res.json(results); // Send JSON response with the results
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  usersModel.getUserById(id, (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).send("Error fetching user");
    }
    if (results.length === 0) {
      return res.status(404).send("User not found");
    }
    res.json(results[0]);
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { username, password, weight } = req.body;
  const image_url = req.file ? req.file.path : null;

  const updateUser = {
    username,
    password,
    weight,
    image_url,
  };

  usersModel.updateUser(id, updateUser, (err) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).send("Error updating user");
    }
    res.status(200).json({ message: "User updated successfully" });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  usersModel.deleteUser(id, (err) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).send("Error deleting user");
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
};

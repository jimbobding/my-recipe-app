const express = require("express");
const usersModel = require("../models/users");
const path = require("path");
const bcrypt = require("bcrypt");

const saltRounds = 10;

// Helper function to hash password
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

// Create user
exports.createUser = async (req, res) => {
  const { username, password, weight } = req.body;
  const image_file = req.file; // Retrieve the file object from the request
  const image_url = image_file ? path.basename(image_file.path) : null; // Store only the file name
  // const image_url = "/uploads/test-image.png";
  console.log("req.file", req.file);
  try {
    // Check if username already exists
    usersModel.findByUsername(username, async (err, results) => {
      if (err) {
        console.error("Error checking username:", err);
        return res.status(500).send("Internal server error");
      }
      if (results.length > 0) {
        return res.status(400).send("Username already exists");
      }

      const hashedPassword = await hashPassword(password);
      usersModel.createUser(
        username,
        hashedPassword,
        image_url,
        weight,
        (err, results) => {
          if (err) {
            console.error("Error creating user:", err);
            return res.status(500).send("Error creating user");
          }
          // Construct the URL for the image
          const imageUrl = image_url
            ? `${req.protocol}://${req.get("host")}/uploads/${image_url}`
            : null;

          res.status(201).json({
            message: "User created successfully",
            id: results.insertId,
            imageUrl: imageUrl, // Return the full URL
          });
        }
      );
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Internal server error");
  }
};

// Get all users
exports.getAllUsers = (req, res) => {
  usersModel.getAllUsers((err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).send("Error fetching users");
    }
    res.json(results);
  });
};

// Get user by ID
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

    const user = results[0];
    const userWithCamelCase = {
      id: user.id,
      username: user.username,
      password: user.password,
      imageUrl: user.image_url
        ? `${req.protocol}://${req.get("host")}/uploads/${user.image_url}`
        : null,
      weight: user.weight,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };

    res.json(userWithImageUrl);
  });
};

// Update user
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, password, weight } = req.body;
  const image_file = req.file ? req.file.path : null; // Retrieve the file path from the request

  const updateUser = {
    username,
    weight,
    image_url: image_file,
  };
  // console.log("created image", imageUrl);

  if (password) {
    try {
      updateUser.password = await hashPassword(password);
    } catch (error) {
      return res.status(500).send("Internal server error");
    }
  }

  usersModel.updateUser(id, updateUser, (err) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).send("Error updating user");
    }
    res.status(200).json({ message: "User updated successfully" });
  });
};

// Delete user
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

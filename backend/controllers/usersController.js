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
  const image_url = req.file ? req.file.path : null;

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
          res.status(201).json({
            message: "User created successfully",
            id: results.insertId,
            imageUrl: image_url,
          });
        }
      );
    });
  } catch (error) {
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
    res.json(results[0]);
  });
};

// Update user
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, password, weight } = req.body;
  const image_url = req.file ? req.file.path : null;

  const updateUser = {
    username,
    weight,
    image_url,
  };

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

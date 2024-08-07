const usersModel = require("../models/users");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.signIn = async (req, res) => {
  const { username, password } = req.body;

  console.log("Request Body:", req.body); // Log the request body

  try {
    // Retrieve the user by username
    usersModel.findByUsername(username, async (err, results) => {
      if (err) {
        console.error("Error finding user:", err);
        return res.status(500).send("Internal server error");
      }

      console.log("Database Results:", results); // Log database results

      if (results.length === 0) {
        console.log("User not found");
        return res.status(401).send("User not found");
      }

      const user = results[0];

      // Compare the provided password with the hashed password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        console.log("Invalid password");
        return res.status(401).send("Invalid password");
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Send the token and user details in the response
      res.status(200).json({
        message: "Login successful",
        user: { id: user.id, username: user.username },
        token,
      });
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).send("Internal server error");
  }
};

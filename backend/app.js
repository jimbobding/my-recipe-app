const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const recipeRouter = require("./routes/recipes");

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(cors({ origin: "http://localhost:3001" }));

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use your routes
app.use("/api", recipeRouter); // This mounts your routes under /api

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const router = require("./routes/index");

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log("Request Fields:", req.body);
  console.log("Files:", req.file);
  next();
});

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use your routes
app.use(router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const recipeRouter = require("./routes/recipes");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");

// Middleware to parse JSON and URL-encoded data with custom limit
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(cors({ origin: "*" }));

// Middleware to set Content Security Policy
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data:;"
  );
  console.log(`Request for image: ${req.url}`);

  next();
});

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use your routes
app.use("/api/recipes", recipeRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Recipe App API!");
});

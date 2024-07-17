// app.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/index"); // Import your routes

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/", routes); // Mount your routes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

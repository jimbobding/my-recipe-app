const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const path = require("path");
const multer = require("multer");

// Setup multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const logRequestDetails = (req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.originalUrl}`);
  console.log(`Request Body: ${JSON.stringify(req.body)}`);
  if (req.file) {
    console.log(`Uploaded File: ${req.file.originalname}`);
  }
  next();
};

// Define routes for user-related operations

// Create a new user
// router.post("/", upload.single("image"), usersController.createUser); // POST /api/users
router.post(
  "/",
  logRequestDetails,
  upload.single("image"),
  (req, res, next) => {
    console.log("Handling POST /api/users");
    usersController.createUser(req, res, next);
  }
);

// Get all users
router.get("/", usersController.getAllUsers); // GET /api/users

// Get a specific user by ID
router.get("/:id", usersController.getUserById); // GET /api/users/:id

// Update a specific user by ID
router.put("/:id", upload.single("image"), usersController.updateUser); // PUT /api/users/:id

// Delete a specific user by ID
router.delete("/:id", usersController.deleteUser); // DELETE /api/users/:id

module.exports = router;

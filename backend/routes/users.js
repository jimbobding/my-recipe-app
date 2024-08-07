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

router.post("/", upload.single("image"), usersController.createUser);

// Get all users
router.get("/", usersController.getAllUsers);

// Get a specific user by ID
router.get("/:id", usersController.getUserById);

// Update a specific user by ID
router.put("/:id", upload.single("image"), usersController.updateUser);

// Delete a specific user by ID
router.delete("/:id", usersController.deleteUser);

module.exports = router;

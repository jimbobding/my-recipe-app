const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Sign in route
router.post("/signin", authController.signIn);

module.exports = router;

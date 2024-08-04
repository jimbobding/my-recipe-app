const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/users", usersController.createUser);
router.get("/users", usersController.getAllUsers);
router.put("/users/:id", upload.single("image"), usersController.updateUser);

module.exports = router;

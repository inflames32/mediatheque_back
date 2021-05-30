const express = require("express");
const authController = require("../controllers/authController");
const albumController = require("../controllers/albumController");
const userController = require("../controllers/userController");
const path = require("path");

const router = express.Router();

//Index
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

router.get("/test", (req, res) => {
  console.log("test");
});

// User
router.post("/api/register", authController.signUp);
//router.get("/api/register", authController.signIn);

module.exports = router;

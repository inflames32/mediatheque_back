const express = require("express");
//const authController = require("../controllers/authController");
const albumController = require("../controllers/albumController");
const userController = require("../controllers/userController");
const path = require("path");

const router = express.Router();

//Index
router.get("/", (res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
// Login
router.get("/api/login", userController.signIn);

// User
router.post("/api/register", userController.signUp);
//router.get("/api/user/:id", userController.getOneUser);

// List of albums
router.get("/api/albums", albumController.getAllAlbums);
router.post("/api/albums/addAlbum", albumController.addAlbum);

// One album
router.get("/api/album/:name", albumController.getOneAlbum);
router.get("/api/album/:id", albumController.getOneAlbumByID);
router.delete("/api/album/:id", albumController.deleteAlbum);
//router.put("/api/album/:id", albumController.updateAlbum);

module.exports = router;

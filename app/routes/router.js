const express = require("express");

const albumController = require("../controllers/albumController");
const userController = require("../controllers/userController");
const path = require("path");

const router = express.Router();

//Index
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
// Login
router.post("/api/login", userController.login);

// User
router.post("/api/register", userController.signup);
//router.route("api/user/:id").get(userController.getOneUser);
//.delete(userController.deleteUser);

// List of albums
router.get("/api/albums", albumController.getAllAlbums);
router.post("/api/albums/addAlbum", albumController.addAlbum);

// One album
//router.get("/api/album/:name", albumController.getOneAlbum);
router.get("/api/album/:id", albumController.getOneAlbumByID);
router.delete("/api/album/:id", albumController.deleteAlbum);

module.exports = router;

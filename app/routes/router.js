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
router.post("/login", userController.login);

// User
router.post("/signup", userController.signup);
//router.route("api/user/:id").get(userController.getOneUser);
//.delete(userController.deleteUser);

// List of albums
router.get("/albums", albumController.getAllAlbums);
router.post("/albums/addAlbum", albumController.addAlbum);

// One album
//router.get("/api/album/:name", albumController.getOneAlbum);
router.get("/album/:id", albumController.getOneAlbumByID);
router.delete("/album/:id", albumController.deleteAlbum);

module.exports = router;

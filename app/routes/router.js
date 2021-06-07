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

// User
router.post("/api/register", authController.signUp);
//router.get("/api/register", authController.signIn);

// Album
router.get("/api/albums", albumController.getAllAlbums);
router.post("/api/albums/addAlbum", albumController.addAlbum);

router.get("/api/album/:id", albumController.getOneAlbumByID);
router.delete("/api/album/:id", albumController.deleteAlbum);
//router.put("/api/album/:id", albumController.updateAlbum);

module.exports = router;

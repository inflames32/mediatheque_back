const router = require("express").Router();

const albumController = require("../controllers/albumController");
const userController = require("../controllers/userController");
const path = require("path");

//Index
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
// Login
router.post("/login", userController.login);

// User
router.post("/signup", userController.signup);
router.get("/user/:id/", userController.login);
router.delete("/user/:id/supprimer-mon-compte", userController.deleteUser);

// List of albums
router.get("/albums", albumController.getAllAlbums);
router.post("/albums/addAlbum", albumController.addAlbum);

// List of albums user
router.post("/user/:id/mes-albums/add-album", albumController.addAlbumToMyList);
router.get("/user/:id/mes-albums", albumController.getAlbumsList);

// One album
//router.get("/api/album/:name", albumController.getOneAlbum);
router.get("/album/:id", albumController.getAlbumByID);
router.delete("/album/:id", albumController.deleteAlbum);

module.exports = router;

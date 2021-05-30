const router = require("express").Router();
const albumController = require("../controllers/album.controller");

router.post("/addAlbum", albumController.addAlbum);

module.exports = router;

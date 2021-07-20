const AlbumModel = require("../models/albumModel");

const albumController = {
  getAllAlbums: async (req, res) => {
    try {
      const albums = await AlbumModel.find();
      res.json(albums);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "erreur",
      });
    }
  },

  getOneAlbum: async (req, res) => {
    try {
      const albumName = req.params.name;
      const album = await AlbumModel.findOne({
        name: albumName,
      });
      res.json(album);
    } catch (err) {
      console.trace(err);
      res.status(500).json({
        message: "erreur",
      });
    }
  },

  getOneAlbumByID: async (req, res) => {
    try {
      const albumID = req.params.id;
      const album = await AlbumModel.findById({
        _id: albumID,
      });
      res.json(album);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },

  addAlbum: async (req, res) => {
    console.log(req.body);
    const { name, artist, cover, gencode, year, format, style } = req.body;
    try {
      await AlbumModel.create({
        name,
        artist,
        cover,
        gencode,
        year,
        format,
        style,
      });
      res.status(200).json("Successfully added");
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  deleteAlbum: async (req, res) => {
    console.log(req.params);
    try {
      await AlbumModel.deleteOne({
        _id: req.params.id,
      });
      res.status(200).json({ message: "Successfully deleted." });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
};

module.exports = albumController;

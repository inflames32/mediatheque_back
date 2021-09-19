const AlbumModel = require("../models/albumModel");

const albumController = {
  getAllAlbums: async (req, res) => {
    try {
      const albums = await AlbumModel.find();
      console.log(albums);
      res.json(albums);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "erreur de récupération des albums",
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

  getAlbumByID: async (req, res) => {
    try {
      await AlbumModel.findById(req.params.id, (err, docs) => {
        if (!err) {
          res.json({ docs });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  },

  addAlbum: async (req, res) => {
    const { name, artist, cover, gencode, year, format, style } = req.body;

    try {
      const album = await AlbumModel.create({
        name,
        artist,
        cover,
        gencode,
        year,
        format,
        style,
      });
      res.status(200).json({
        album: album._id,
        name: album.name,
      });
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

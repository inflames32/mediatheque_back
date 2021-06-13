const AlbumModel = require("../models/albumModel");

const albumController = {
  getAllAlbums: async (req, res) => {
    try {
      const albums = await AlbumModel.find();
      res.json(albums);
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
      console.log(albumID);
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
    const { name, artist, gencode, year, format, style } = req.body;

    try {
      const album = await AlbumModel.create({
        name,
        artist,
        gencode,
        year,
        format,
        style,
      });
      res.status(200).json({ name: name._id });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },

  deleteAlbum: async (req, res) => {
    console.log(req.params);
    try {
      await AlbumModel.deleteOne({
        _id: req.params.id,
      });

      //.exec();
      res.status(200).json({ message: "Successfully deleted." });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
};

module.exports = albumController;

const Album = require("../models/albumModel");
const UserModel = require("../models/userModel");

const albumController = {
  // récupérer tous les albums publics
  getAllAlbums: async (req, res) => {
    try {
      const albums = await Album.find();
      res.status(200).json(albums);
    } catch (err) {
      res.status(500).json({
        message: "erreur de récupération des albums",
      });
    }
  },
  // récupérer les infos d'un album
  getOneAlbum: async (req, res) => {
    try {
      const albumName = req.params.name;
      const album = await Album.findOne({
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

  //récupérer un album avec son id
  getAlbumByID: async (req, res) => {
    const id = req.params.id.replace(":", "");
    console.log(id);
    try {
      await Album.findById(id, (err, docs) => {
        if (!err) {
          res.json(docs);
          return;
        }
      });
    } catch (err) {
      res.status(500).json({ message: err });
      return;
    }
  },

  // récupérer la liste des albums de l'utilisateur
  getAlbumsList: async (req, res) => {
    const _id = req.params.id;
    try {
      const list = await Album.find({ userId: { $eq: _id } });
      res.json(list);
      console.log(list);
    } catch (err) {
      res.status(500).json({
        message: "erreur de récupération des albums",
      });
      return;
    }
  },

  //ajouter un album public
  addAlbum: async (req, res) => {
    const { name, artist, cover, gencode, year, format, style } = req.body;
    try {
      const album = await Album.create({
        name,
        artist,
        cover,
        gencode,
        year,
        format,
        style,
        listAlbums: [],
      });
      res.status(200).json({
        album: album._id,
        name: album.name,
      });
    } catch (error) {
      res.status(500).json(error);
      return;
    }
  },

  addAlbumToMyList: async (req, res) => {
    const { name, artist, cover, gencode, year, format, style } = req.body;
    const _id = req.params.id;

    try {
      const album = await Album.create({
        userId: _id,
        name,
        artist,
        cover,
        gencode,
        year,
        format,
        style,
      });

      res.status(200).json({
        album,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  deleteAlbum: async (req, res) => {
    const id = req.params.id.replace(":", "");
    try {
      await Album.findOneAndRemove(
        {
          _id: id,
        },
        (err, album) => {
          if (err) {
            res.status(500).json({ message: "album not found" });
            return;
          }
          if (album) {
            delete album;
            res.status(200).json({ message: "Successfully deleted." });
            return;
          }
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
};

module.exports = albumController;

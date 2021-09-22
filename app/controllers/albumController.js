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
    const id = req.params.id.replace(':', "");    
    console.log(id);
    try {
      await AlbumModel.findById(id, (err, docs) => {
        console.log(docs);
        if (!err) {
          res.json(docs);
        } else {
          console.log(err);
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
    const id = req.params.id.replace(':',"");    
    try {
      await AlbumModel.findOneAndRemove(
        {
          _id: id,
        },
        (err, docs) => {                 
          if (!err) {
            console.log('ici', docs);
            delete docs
            res.status(200).json({ message: "Successfully deleted." });
          }
          else if(err){
            console.log(err);
            res.json({err});
          }  
          else{
            res.json({
              message: "album introuva ble"
            })
          }
        }
      );

      
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },

  getMyListAlbums: async (req, res) => {
    const userId = req.params.body;
    console.log(userId);
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
};

module.exports = albumController;

// collection user
// const { albumPossédé } = await tacollection.getOne({ _id: iduser })
// getOneAlbum(id)
// {
//  id: 'sonid'
//  name: 'toto',
//  albumPossédé : [
//    'idalbum1', 'idalbum2'
//  ]
// }

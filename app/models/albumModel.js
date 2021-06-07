const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  artist: {
    type: String,
  },
  profil: {
    type: String,
    profil: "./images/jaquettes/undefined.png",
  },
  gencode: {
    type: Number,
  },
  year: {
    type: Number,
    minLength: 4,
    maxLength: 4,
  },
  format: {
    type: String,
  },
  style: {
    type: String,
  },
});

const AlbumModel = mongoose.model("album", albumSchema);
module.exports = AlbumModel;

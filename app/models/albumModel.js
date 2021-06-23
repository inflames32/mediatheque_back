const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  artist: {
    type: String,
  },
  cover: {
    type: String,
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

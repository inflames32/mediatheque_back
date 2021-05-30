const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  artist: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  gencode: {
    type: Number,
    required: false,
    unique: true,
    trim: true,
  },
  year: {
    type: Number,
    required: false,
    minLength: 4,
    maxLength: 4,
    unique: true,
    trim: true,
  },
  format: {
    type: String,
    required: false,

    unique: true,
    trim: true,
  },
  style: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
});

const albumModel = mongoose.model("album", albumSchema);
module.exports = albumModel;

const mongoose = require("mongoose");
const albumSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  artist: String,
  artist: String,
  gencode: Number,
  year: Number,
  format: String,
  style: String,
});

module.exports = mongoose.model("Album", albumSchema);

const albumModel = require("../models/albumModel");

const albumController = {
  addAlbum: async (req, res) => {
    console.log(req.body);
    const { name, artist, gencode, year, format, style } = req.body;

    try {
      const user = await albumModel.create({
        name,
        artist,
        gencode,
        year,
        format,
        style,
      });
      res.status(200).json({ name: name._id });
    } catch (err) {
      console.trace("error");
      res.status(500).json(err);
    }
  },
};

module.exports = albumController;

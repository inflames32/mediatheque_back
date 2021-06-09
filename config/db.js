const mongoose = require("mongoose");

mongoose
  .connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to MongoDB"))
  .catch((e) => {
    console.log("failed to connect to MongoDB", e);
  });

module.exports = mongoose;

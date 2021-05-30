require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const router = require("./app/router");
console.log(mongoose);
const app = express();

const PORT = 3000;

app.use(router);
app.listen(PORT, () => {
  console.log("server up!");
});

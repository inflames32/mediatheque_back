const express = require("express");
const userRoutes = "./routes/user.routes";
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();

/* const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); */

const router = require("./app/router");
//console.log(mongoose);

const PORT = 5000;
// routes
app.use("/api/user", userRoutes);
app.use(router);
// server
app.listen(PORT, () => {
  console.log("server up!");
});

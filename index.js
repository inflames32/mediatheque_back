const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const router = require("./app/routes/router");
//const userRoutes = require("./app/routes/user.routes.js");
//const albumRoutes = require("./app/routes/album.routes.js");

const app = express();
app.use(express.json());

// routes

app.use(router);

//app.use("/api/albums", albumsRoutes);

// server
const Port = process.env.PORT || 5001;
app.listen(Port, () => {
  console.log(`listening on ${process.env.PORT}`);
});

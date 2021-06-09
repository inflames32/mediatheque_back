const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const cors = require("cors");

const router = require("./app/routes/router");

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use(router);

// server
const Port = process.env.PORT || 5001;
app.listen(Port, () => {
  console.log(`listening on ${process.env.PORT}`);
});

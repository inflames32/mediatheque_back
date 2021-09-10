const express = require("express");
//const bodyParser = require("body-parser");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const cors = require("cors");
const router = require("./app/routes/router");

const app = express();
app.use(express.json());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Credentials", false);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// delete on prod

app.set("trust proxy", 1);

// routes
app.use(router);

// server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});

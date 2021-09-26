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
  optionSuccessStatus: 200,
};

app.use((req, res, next) => {
  /*  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Request-Headers",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  ); */
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(cors(corsOptions));
// delete on prod

//app.set("trust proxy", 1);

// routes
app.use(router);

// server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});

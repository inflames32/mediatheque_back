const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const cors = require("cors");
const router = require("./app/routes/router");

const app = express();
app.use(express.json());

const corsOptions = {
  credentials: true,
  origin: "https://mamediatheque.netlify.app",
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://mamediatheque.netlify.app"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// routes
app.use(router);

// server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});

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

// routes
app.use(router);

// server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});

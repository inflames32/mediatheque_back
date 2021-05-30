const express = require("express");
const path = require("path");

const router = express.Router();

//Index
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

router.get("/test", (req, res) => {
  console.log("test");
});

module.exports = router;

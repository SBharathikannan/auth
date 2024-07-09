const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/router");
const cors = require("cors");
const app = express();
const { createAdmin } = require("./scripts/admin");

app.use(express.json());
app.use(cors());
app.use(router);

createAdmin();

mongoose.connect("mongodb://localhost:27017/codeelevate").then(() => {
  console.log("DB CONNECTED");
  app.listen(3000, () => {
    console.log("Port running on 3000");
  });
});

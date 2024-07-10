const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/router");
const cors = require("cors");
const app = express();
const { createAdmin } = require("./scripts/admin");
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(router);

createAdmin();

mongoose
  .connect(
    "mongodb+srv://bk:bk@auth.cmtorb5.mongodb.net/?retryWrites=true&w=majority&appName=auth"
  )
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(port, () => {
      console.log("Port running on 3000");
    });
  });

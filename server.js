const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");
const port = 3000;
//  DB
mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    autoIndex: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// Routes

// Server Starting :3000
app.listen(port, () => console.log(`Server started on ${port}`));

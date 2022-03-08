// server.js
const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const Wilder = require("./models/Wilder");
const WilderModel = require("./models/Wilder");
const app = express();
const wilderController = require("./controllers/wilders")
//Database
mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
      autoIndex: true
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // routes
  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.post("/api/wilder/create", wilderController.create);

  app.get('/api/wilder/read', wilderController.read)
  
  app.post('/api/wilder/:id/update', wilderController.update)

  app.post('/api/wilder/:id/delete', wilderController.delete)


// start server
app.listen(3000, () => console.log("Server started on 3000"));
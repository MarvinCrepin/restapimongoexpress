const express = require("express");
const app = express();
const wilderRoutes = require("./routes/wilders");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((error, req, res, next) => {
  // Sets HTTP status code
  res.status(error.status);

  // Sends response
  res.json({ message: error.message });
});
app.use("/", wilderRoutes);

module.exports = app;

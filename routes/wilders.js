// Routes
const wilderController = require("../controllers/WilderController");
const express = require("express");
const router = express.Router();

router.post("/api/wilders/", wilderController.create);
router.get("/api/wilders/", wilderController.read);
router.post("/api/wilder/:id/", wilderController.update);
router.delete("/api/wilder/:id", wilderController.delete);

module.exports = router;

const express = require("express");
const feedControle = require("../controllers/feed")
const router = express.Router();



router.post("/feedback/", feedControle.createfeedback);



module.exports = router;
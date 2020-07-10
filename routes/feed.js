const express = require("express");
const router = express.Router();
const { getFeed } = require("../handlers/feed");

router.get("/feed", getFeed);

module.exports = router;

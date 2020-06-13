const express = require("express");
const router = express.Router();
const { createGif, deleteGif } = require("../handlers/gifs");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

router.post("/gifs", multipartMiddleware, createGif);
router.delete("/gifs/:gifId", deleteGif);

module.exports = router;

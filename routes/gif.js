const express = require("express");
const router = express.Router();
const { createGif } = require("../handlers/gifs");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

router.post("/gifs", multipartMiddleware, createGif);

module.exports = router;

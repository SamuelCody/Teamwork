const express = require("express");
const router = express.Router();
const { commentArticle, commentGif } = require("../handlers/comment");

router.post("/articles/:articleId/comment", commentArticle);
router.post("/gifs/:gifId/comment", commentGif);

module.exports = router;

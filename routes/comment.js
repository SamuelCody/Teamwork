const express = require("express");
const router = express.Router();
const { commentArticle } = require("../handlers/comment");

router.post("/articles/:articleId/comment", commentArticle);

module.exports = router;

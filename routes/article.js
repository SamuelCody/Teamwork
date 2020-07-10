const express = require("express");
const router = express.Router();
const { createArticle, editArticle } = require("../handlers/articles");

router.post("/articles", createArticle);
router.patch("/articles/:articleId", editArticle);

module.exports = router;

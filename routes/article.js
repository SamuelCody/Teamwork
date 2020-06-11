const express = require("express");
const router = express.Router();
const { createArticle } = require("../handlers/articles");

router.post("/articles", createArticle);

module.exports = router;

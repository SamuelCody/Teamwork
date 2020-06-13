const express = require("express");
const router = express.Router();
const {
  createArticle,
  editArticle,
  deleteArticle,
} = require("../handlers/articles");

router.post("/articles", createArticle);
router.patch("/articles/:articleId", editArticle);
router.delete("/articles/:articleId", deleteArticle);

module.exports = router;

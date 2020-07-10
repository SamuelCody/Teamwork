const express = require("express");
const router = express.Router();
const {
  createArticle,
  editArticle,
  deleteArticle,
  getArticle,
} = require("../handlers/articles");

router.post("/articles", createArticle);
router.patch("/articles/:articleId", editArticle);
router.delete("/articles/:articleId", deleteArticle);
router.get("/articles/:articleId", getArticle);

module.exports = router;

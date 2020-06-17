const mongoose = require("mongoose");
const User = require("./User");
const Article = require("./Article");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = new mongoose.model("Comment", commentSchema);

module.exports = Comment;

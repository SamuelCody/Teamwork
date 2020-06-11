const mongoose = require("mongoose");
const User = require("./User");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Article = new mongoose.model("Article", articleSchema);

module.exports = Article;

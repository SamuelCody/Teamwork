const mongoose = require("mongoose");
const User = require("./User");
const Comment = require("./Comment");

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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

articleSchema.pre("remove", async function (next) {
  try {
    const User = require("./User");
    let user = await User.findById(this.user);
    user.articles.remove(this._id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Article = new mongoose.model("Article", articleSchema);

module.exports = Article;

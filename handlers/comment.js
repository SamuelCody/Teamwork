require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Article = require("../models/Article");
const Gif = require("../models/Gif");
const Comment = require("../models/Comment");

//comment on an article
exports.commentArticle = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
      let article = await Article.findById(req.params.articleId);
      let comment = await Comment.create({
        comment: req.body.comment,
        authorId: decoded.id,
        articleId: article._id,
      });
      let foundUser = await User.findById(decoded.id);
      foundUser.comments.push(comment._id);
      await foundUser.save();
      await article.comments.push(comment._id);
      await article.save();
      return res.status(200).json({
        status: "success",
        data: {
          message: "Comment successfully created",
          createdOn: comment.createdAt,
          articleTitle: article.title,
          article: article.article,
          comment: comment.comment,
        },
      });
    });
  } catch (err) {
    return next({
      status: 400,
      message: "Comment failed to post",
    });
  }
};

//comment on a gif
exports.commentGif = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
      let gif = await Gif.findById(req.params.gifId);
      let comment = await Comment.create({
        comment: req.body.comment,
        authorId: decoded.id,
        gifId: gif._id,
      });
      let foundUser = await User.findById(decoded.id);
      foundUser.comments.push(comment._id);
      await foundUser.save();
      await gif.comments.push(comment._id);
      await gif.save();
      return res.status(200).json({
        status: "success",
        data: {
          message: "Comment successfully created",
          createdOn: comment.createdAt,
          gifTitle: gif.title,
          comment: comment.comment,
        },
      });
    });
  } catch (err) {
    return next({
      status: 400,
      message: "Comment failed to post",
    });
  }
};

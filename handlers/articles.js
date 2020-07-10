require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Article = require("../models/Article");

//create an article
exports.createArticle = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
      let article = await Article.create({
        title: req.body.title,
        article: req.body.article,
        user: decoded.id,
      });
      let foundUser = await User.findById(decoded.id);
      foundUser.articles.push(article._id);
      await foundUser.save();
      await Article.findById(article._id).populate("user", {
        firstName: true,
        lastName: true,
      });
      return res.status(200).json({
        status: "success",
        data: {
          message: "Article posted successfully",
          articleId: article._id,
          createdOn: article.createdAt,
          title: article.title,
          article: article.article,
          userId: article.user,
        },
      });
    });
  } catch (err) {
    return next({
      status: 400,
      message: "Article failed to post",
    });
  }
};

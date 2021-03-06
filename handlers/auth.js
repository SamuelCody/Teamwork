require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next) {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    let { id, email, role } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          email,
          role,
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        status: "success",
        data: {
          token,
          userId: id,
          email,
          role,
        },
      });
    } else {
      return next({
        status: 400,
        message: "Invalid email/password",
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid email/password",
    });
  }
};

exports.signup = async function (req, res, next) {
  try {
    //create a user
    let user = await User.create(req.body);
    let { id, email, role } = user;
    //create a token
    let token = jwt.sign(
      {
        id,
        email,
        role,
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      status: "success",
      data: {
        message: "User account successfully created",
        token,
        userId: id,
        email,
        role,
      },
    });
  } catch (err) {
    //if validation fails
    if (err.code === 11000) {
      err.message = "Sorry, that email is taken";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

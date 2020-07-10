require("dotenv").config();
const jwt = require("jsonwebtoken");
const role = require("../role");

//make sure the user is logged in - Authentication
exports.loginRequired = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please log in first",
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Please log in first",
    });
  }
};

//make sure user has the necessary privileges
exports.userPrivilege = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next({
        status: 401,
        message: "Access denied, log in as Admin",
      });
    } else {
      jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (
          role[decoded.role].find(function (url) {
            return url == req.url;
          })
        ) {
          req.user = decoded;
          return next();
        } else {
          return next({
            status: 401,
            message: "Access denied, log in as Admin",
          });
        }
      });
    }
  } catch (err) {
    return next({
      status: 401,
      message: "Invalid Token",
    });
  }
};

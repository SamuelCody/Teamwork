const Article = require("../models/Article");
const Gif = require("../models/Gif");
const jwt = require("jsonwebtoken");

//this function snippet sort an array of
//object by its property and order - (desc or asc)
function dynamicsort(property, order) {
  var sort_order = 1;
  if (order === "desc") {
    sort_order = -1;
  }
  return function (a, b) {
    // a should come before b in the sorted order
    if (a[property] < b[property]) {
      return -1 * sort_order;
      // a should come after b in the sorted order
    } else if (a[property] > b[property]) {
      return 1 * sort_order;
      // a and b are the same
    } else {
      return 0 * sort_order;
    }
  };
}

exports.getFeed = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
      let feed = await Article.find();
      let allGif = await Gif.find();
      // let allGif = await Gif.find().sort({ createdAt: "desc" }); For development

      allGif.map(function (value) {
        feed.push(value);
        return feed;
      });
      let sortedField = feed.sort(dynamicsort("createdAt", "desc"));
      return res.status(200).json({
        status: "success",
        data: sortedField,
      });
    });
  } catch (err) {
    return next({
      status: 400,
      message: "Cannot get feed",
    });
  }
};

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const errorHandler = require("./handlers/error");
const { loginRequired } = require("./middleware/auth");
const auth = require("./routes/auth");
const gif = require("./routes/gif");
const article = require("./routes/article");
const comment = require("./routes/comment");

mongoose.set("debug", true);
mongoose.connect(process.env.DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.Promise = Promise;

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//all routes will be here- come later
app.use("/api/v1", auth);
app.use("/api/v1", loginRequired, gif);
app.use("/api/v1", loginRequired, article);
app.use("/api/v1", loginRequired, comment);

app.use(function (req, res, next) {
  let err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});

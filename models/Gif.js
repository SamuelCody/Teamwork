const mongoose = require("mongoose");
const User = require("./User");

const gifSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
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

const Gif = new mongoose.model("Gif", gifSchema);

module.exports = Gif;

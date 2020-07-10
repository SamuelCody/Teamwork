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
    imageId: {
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

gifSchema.pre("remove", async function (next) {
  try {
    const User = require("./User");
    let user = await User.findById(this.user);
    user.gifs.remove(this._id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Gif = new mongoose.model("Gif", gifSchema);

module.exports = Gif;

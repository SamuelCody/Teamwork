require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Gif = require("../models/Gif");

//cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//create a gif
exports.createGif = async function (req, res, next) {
  try {
    let fileName = req.files.image.path;
    //upload the gif to cloudinary
    await cloudinary.uploader.upload(
      fileName,
      { allowed_formats: ["gif"] },
      async function (err, uploaded) {
        if (uploaded) {
          //check header for token payload to get userId
          const token = req.headers.authorization.split(" ")[1];
          jwt.verify(token, process.env.SECRET_KEY, async function (
            err,
            decoded
          ) {
            let gif = await Gif.create({
              title: req.body.title,
              image: uploaded.url,
              imageId: uploaded.public_id,
              user: decoded.id,
            });
            let foundUser = await User.findById(decoded.id);
            foundUser.gifs.push(gif._id);
            await foundUser.save();
            await Gif.findById(gif._id).populate("user", {
              firstName: true,
              lastName: true,
            });
            return res.status(200).json({
              status: "success",
              data: {
                gifId: gif._id,
                message: "GIF image successfully posted",
                createdOn: gif.createdAt,
                title: gif.title,
                imageUrl: gif.image,
                user: gif.user,
              },
            });
          });
        }
      }
    );
  } catch (err) {
    return next({
      status: 400,
      message: "GIF image failed to post",
    });
  }
};

//delete a gif
exports.deleteGif = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
      let gif = await Gif.findById(req.params.gifId);
      if (decoded.id == gif.user) {
        await cloudinary.uploader.destroy(gif.imageId, async function (
          err,
          result
        ) {
          await gif.remove();
          return res.status(200).json({
            status: "success",
            data: {
              message: "Gif post successfully deleted",
            },
          });
        });
      } else {
        return next({
          status: 401,
          message: "User Unauthorized",
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Gif failed to delete",
    });
  }
};

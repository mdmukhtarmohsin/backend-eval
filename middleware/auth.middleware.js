const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    let user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (user._id) {
      user = await UserModel.findOne({ _id: user._id });
      req.body = {
        ...req.body,
        user,
      };
      console.log("auth passed");
      next();
    } else {
      res.status(403).send("Not Authorized");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = auth;

const express = require("express");
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/BlackList");
const { default: mongoose } = require("mongoose");
const userRouter = express.Router();
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 5);
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    const normalPassword = req.body.password;
    if (bcrypt.compareSync(normalPassword, user.password)) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
      res.status(200).json({ token: token });
    } else {
      res.status(401).json({ msg: "Incorrect credintials" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

userRouter.post("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const newBlackToken = new blacklistModel({ blacklist: token });
    await newBlackToken.save();
    res.status(200).json({ msg: "User Logged Out" });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = userRouter;

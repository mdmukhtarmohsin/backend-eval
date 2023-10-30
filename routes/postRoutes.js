const express = require("express");
const auth = require("../middleware/auth.middleware");
const PostModel = require("../models/Post");
const UserModel = require("../models/User");
const postRouter = express.Router();

postRouter.use(auth);

postRouter.post("/add", async (req, res) => {
  try {
    req.body.post.createdBy = req.body.user._id;
    const newPost = new PostModel(req.body.post);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

postRouter.get("/", async (req, res) => {
  try {
    const page = req.query.page || 0;
    const posts = await PostModel.find({ createdBy: req.body.user._id })
      .skip(page * 3)
      .limit(3);
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

postRouter.get("/top", async (req, res) => {
  try {
    const page = req.query.page || 0;
    const posts = await PostModel.find({ createdBy: req.body.user._id })
      .sort({
        no_of_comments: "desc",
      })
      .skip(page * 3)
      .limit(3);
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

postRouter.patch("/update", async (req, res) => {
  try {
    const post = await PostModel.findOneAndUpdate(
      { _id: req.body.post._id },
      req.body.post,
      { new: true }
    );
    res.status(202).json(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

postRouter.delete("/delete", async (req, res) => {
  try {
    const post = await PostModel.deleteOne({ _id: req.body.post._id });
    res.status(203).json({ mgs: "Post Deleted", post });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = postRouter;

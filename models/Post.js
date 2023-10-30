const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
    enum: ["Mobile", "Laptop", "tablet"],
  },
  no_of_comments: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
  },
});

const PostModel = mongoose.model("Post", postSchema);
module.exports = PostModel;

const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
  blacklist: {
    type: String,
  },
});

const blacklistModel = mongoose.model("Blacklist", blacklistSchema);
module.exports = blacklistModel;

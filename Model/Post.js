var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var newPostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

var Post = mongoose.model("Post", newPostSchema);
module.exports = Post;

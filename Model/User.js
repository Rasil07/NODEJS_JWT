const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newUserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  admin: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", newUserSchema);

module.exports = User;

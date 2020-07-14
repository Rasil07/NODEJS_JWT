const Post = require("../Model/Post");
const User = require("../Model/User");
const verifyToken = require("../Services/verifyToken");

async function getMyPost(req, res) {
  const token = req.header("auth-token");
  const { decoded, user_id } = await verifyToken(token, res);
  if (decoded) {
    const user_id = decoded.data.id;
    await Post.find({ posted_by: { _id: user_id } })
      .populate("posted_by", "name")
      .exec(function (error, posts) {
        if (error) {
          return res.status(400).json(error);
        }
        return res.status(200).json(posts);
      });
  } else {
    return res.status(400).json("Something went wrong");
  }
}

async function postMyPost(req, res) {
  const token = req.header("auth-token");
  const { decoded, user_id } = await verifyToken(token);

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    posted_by: user_id,
  });

  post.save(function (error) {
    if (!error) {
      Post.find({ posted_by: { _id: user_id } })
        .populate("posted_by", "name")
        .exec(function (error, posts) {
          return res.status(200).json(posts);
        });
    }
  });
}

async function updateMyPost(req, res) {
  const token = req.header("auth-token");
  const { decoded, user_id } = await verifyToken(token);
  Post.findOne({ _id: req.params.id }).exec(function (err, post) {
    if (err) {
      res.status(400).json(err);
      return;
    } else if (post.posted_by.toString() !== user_id) {
      res.status(401).json("Unauthorized request");
      return;
    } else if (!post) {
      res.status(404).json("Post doesnt exist");
      return;
    }
    post.title = req.body.title;
    post.content = req.body.content;
    post
      .save()
      .then((post) => {
        res.status(200).json("Post updated");
        return;
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
}

async function deleteMyPost(req, res) {
  if (req.header("auth-token") === undefined) {
    return res.status(404).json("Unauthorized to delete this post");
  }
  const token = req.header("auth-token");
  const { decoded, user_id } = await verifyToken(token, res);

  Post.findOne({ _id: req.params.id })
    .populate("User")
    .exec(function (err, post) {
      if (err) {
        console.log(err);
      } else if (post.posted_by.toString() !== user_id) {
        res.status(401).json("Unauthorized request");
        return;
      }
      post
        .deleteOne()
        .then(() => {
          res.status(200).json("Deleted");
          return;
        })
        .catch((err) => {
          res.status(400).json(err);
          return;
        });
    });
}
module.exports = { getMyPost, postMyPost, deleteMyPost, updateMyPost };

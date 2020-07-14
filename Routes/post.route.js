const express = require("express");
const router = express.Router();
const {
  getMyPost,
  postMyPost,
  deleteMyPost,
  updateMyPost,
} = require("../Controller/post.controller");
router.get("/", (req, res) => {
  getMyPost(req, res);
});
router.post("/", (req, res) => {
  postMyPost(req, res);
});
router.post("/update/:id", (req, res) => {
  updateMyPost(req, res);
});
router.post("/delete/:id", (req, res) => {
  deleteMyPost(req, res);
});

module.exports = router;

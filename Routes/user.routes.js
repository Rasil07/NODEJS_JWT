const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const {
  registration,
  login,
  update,
} = require("../Controller/user.controller");
const { inputValidation } = require("../Services/inputValidation");

const User = require("../Model/User");
route.post("/login", (req, res) => {
  login(req.body, res);
});
route.post("/register", inputValidation, (req, res) => {
  registration(req.body, res);
});
route.post("/update", (req, res) => {
  update(req, res);
});

module.exports = route;

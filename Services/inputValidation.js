const validator = require("validator");
const isempty = require("is-empty");
const User = require("../Model/User");

function inputValidation(req, res, next) {
  const errors = {};
  const name = req.body.name.toString();
  const email = req.body.email.toString();
  const password = req.body.password.toString();
  const confirm_password = req.body.confirm_password.toString();

  if (validator.isEmpty(name)) {
    errors.name = "Name is required";
  }
  if (!validator.isEmail(email)) {
    errors.email = "Email is not valid";
  }
  if (!validator.isLength(password, { min: 8, max: 32 })) {
    errors.password = "Password must contain atleast 8 characters";
  }
  if (!validator.equals(password, confirm_password)) {
    errors.confirm_password = "Confirmation password must match with password";
  }
  if (isempty(errors)) {
    next();
    return;
  }
  res.status(400).json(errors);
}

module.exports = { inputValidation };

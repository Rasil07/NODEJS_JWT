const jwt = require("jsonwebtoken");
// require("dotenv").config();
module.exports = function generateToken(user) {
  const secret = process.env.secret;
  return jwt.sign({ data: { id: user._id, name: user.name } }, secret, {
    expiresIn: "2h",
  });
};

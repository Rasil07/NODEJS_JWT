const jwt = require("jsonwebtoken");
module.exports = function verify(req, res) {
  try {
    const jwtToken = jwt.verify(req, process.env.secret);
    return { decoded: jwtToken, user_id: jwtToken.data.id };
  } catch (err) {
    return res.status(400).json(err);
  }
};

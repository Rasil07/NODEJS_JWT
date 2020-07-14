const bcrypt = require("bcrypt");
const User = require("../Model/User");
const generateToken = require("../Services/genrateToken");
const verifyToken = require("../Services/verifyToken");

function registration(data, res) {
  User.findOne({ email: data.email })
    .then((user) => {
      if (user) {
        return res.status(400).json("user already exists");
      }
      const saltRounds = 10;
      bcrypt.hash(data.password, saltRounds, (err, hash) => {
        if (err) {
          return res.status(400).json(err);
        }
        const user = new User({
          name: data.name,
          email: data.email,
          password: hash,
        });
        user
          .save()
          .then(() => {
            return res.status(200).json("Registred successfully");
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
}
function login(data, res) {
  User.findOne({ email: data.email })
    .then((user) => {
      if (!user) {
        return res.status(400).json("User not found");
      }
      bcrypt.compare(data.password, user.password, function (err, result) {
        if (err) {
          return res.status(400).json(err);
        } else if (result !== true) {
          return res.status(401).json("Password is incorrect");
        }
      });
      const token = generateToken(user);
      return res
        .status(200)
        .json({ token: token, message: "User logged in", success: true });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
}
async function update(req, res) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(400).json("Token is not present");
  }
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      return res.status(400).json(err);
    } else if (!hash) {
      return res.status(400).json("Hash not not done");
    }
    const { decoded, user_id } = verifyToken(token);
    User.findByIdAndUpdate(
      user_id,
      { name: req.body.name, password: hash },
      (err, doc) => {
        if (doc) {
          return res.status(200).json("Updated");
        }
        return res.status(400).json(err);
      }
    );
  });
}

module.exports = { registration, login, update };

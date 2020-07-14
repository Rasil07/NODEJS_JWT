const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
const userRouter = require("./Routes/user.routes");
const postRouter = require("./Routes/post.route");
const port = 5000;
const URI = process.env.uri;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log(err));

app.listen(port, (err) => {
  if (!err) {
    console.log("server running at port:", port);
  } else {
    console.log(err);
  }
});

app.use("/user", userRouter);
app.use("/post", postRouter);

const express = require("express");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const logger = require("./log-rotator");
const User = require("./models/user");
const apiRouter = require("./routers/apiRouter");
const authRouter = require("./routers/authRouter");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Log every request
app.use((req, res, next) => {
  logger.info(
    `Request URL: ${req.url} Request Type: ${
      req.method
    } Request Body: ${JSON.stringify(req.body)}`
  );
  next();
});

const port = process.env.PORT || 5000;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

mongoose.connect(
  `mongodb+srv://username:${MONGODB_PASSWORD}@cluster-0.ypif198.mongodb.net/test`
);

app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(function (err, req, res, next) {
  let obj = {
    message: err.message,
    stack: err.stack,
    url: req.url,
  };
  console.log(obj);
  logger.error(obj);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

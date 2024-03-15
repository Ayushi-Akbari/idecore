const jwt = require("jsonwebtoken");
const UserModel = require("../User/schema");
const { json } = require("express");
const { log } = require("console");

const user_auth = async (req, res, next) => {
  try {
    // const token = req.cookies.jwt;
    // console.log("hiii");
    // console.log("req.method : ", req.method);
    let token = "";

    // const token = req.headers.authorization;
    // console.log(token);
    // console.log(req.query.token);

    if (req.method === "PATCH") {
      console.log("post");
      token = req.body.token;
      //   console.log("token : ", token);
    }
    if (
      req.method === "DELETE" ||
      req.method === "GET" ||
      req.method === "POST" ||
      req.method === "PUT"
    ) {
      token = req.headers.authorization;
    }

    if (!token) {
      return res.status(401).send("Unauthorized: Token not provided");
    }
    // console.log("token : ", token);

    const secretKey = "atuhjiokbvdftghyujgdefghyjbcfhhgds";
    const verifyUser = jwt.verify(
      token.replace("Bearer ", ""),
      "atuhjiokbvdftghyujgdefghyjbcfhhgds"
    );
    // console.log(verifyUser._id);

    const user = await UserModel.findById(verifyUser._id);
    // console.log(user);
    if (!user) {
      res.status(400).send("First log in");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = user_auth;

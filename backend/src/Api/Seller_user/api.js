const express = require("express");
const router = new express.Router();
const sellerModel = require("./schema");
const userModel = require("../User/schema");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

router.use(express.json());
router.use(cookieParser());

router.post(
  "/seller_register",
  [
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("email", "Invalid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 3,
    }),
    body("confirm_password").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
    body("username").custom(async (value) => {
      const isPresent = await sellerModel.findOne({ username: value });
      if (isPresent) {
        throw new Error("Username already exists");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const sellerData = new sellerModel({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      console.log("sellerData : ", sellerData);

      const ByuerData = new userModel({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      console.log("ByuerData : ", ByuerData);

      console.log("gkjgf");

      await ByuerData.save();
      const registerd = await sellerData.save();

      console.log("registerd : ", registerd);
      console.log("registerdUser : ", registerdUser);
      console.log("vfesddeg");
      if (registerd && registerdUser) {
        res.status(201).send({
          data: registerd,
          status: 200,
          message: "succesfully registered.",
        });
      } else {
        res.status(404).send("Enter a data");
      }
    } catch (e) {
      res.status(400).send({
        data: null,
        status: 400,
        message: "error",
      });
    }
  }
);

router.post(
  "/seller_login",
  [
    body("username", "Enter a user name").exists(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
      }
      const username = req.body.username;
      const password = req.body.password;

      console.log(username + " " + password);
      const user = await sellerModel.findOne({ username: username });
      console.log(user);
      if (!user) {
        return res.send({ code: 404, message: "Enter valid user" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      const token1 = await user.genrateAuthToken();
      //   console.log("token1 : ", token1);
      if (!isMatch) {
        return res.send({ code: 404, message: "Enter valid password" });
      }

      if (isMatch === true && user !== null) {
        // If the passwords do not match, send a response indicating an invalid password
        return res.send({
          code: 200,
          message: "Login succesful",
          token: token1,
          userId: user._id,
        });
      }
    } catch (e) {
      res.status(400).send({
        data: null,
        status: 400,
        message: e,
      });
    }
  }
);

router.post(
  "/verify_user",
  [body("token", "login first").exists()],
  async (req, res) => {
    try {
      console.log(req.body.userId);
      const _id = req.body.userId;
      const token = req.body.token;
      console.log(token);
      const verifyUser = await sellerModel.findById(_id);
      console.log(verifyUser);
      if (verifyUser) {
        const isTokenValid = verifyUser.tokens.some(
          (storedToken) => storedToken.token === token
        );
        if (isTokenValid) {
          return res.send({
            data: { token: token, id: _id },
            status: 200,
            message: "valid user",
          });
        }
      } else {
        return res.send({ data: null, status: 400, message: "Login first" });
      }
    } catch (e) {
      return res.send({ data: null, status: 404, message: e });
    }
  }
);

router.get(
  "/seller_register",
  [
    body("username", "Enter a valid user name").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      const sellerData = await sellerModel.find();
      if (sellerData) {
        res.status(200).send(sellerData);
      } else {
        res.status(400).send();
      }
    } catch (e) {
      res.status(404).send({
        data: null,
        status: 400,
        message: e,
      });
    }
  }
);

module.exports = router;

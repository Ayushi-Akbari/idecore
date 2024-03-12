const express = require("express");
const router = new express.Router();
const userModel = require("./schema");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

router.use(express.json());
router.use(cookieParser());

router.post(
  "/register",
  [
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("email", "Invalid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const password = req.body.password;
      const cpassword = req.body.confirm_password;
      const username = req.body.username;
      const isPresent = await userModel.findOne({ username: username });
      if (isPresent) {
        res.status(404).send({ message: "User already exists" });
      } else {
        if (cpassword === password) {
          const userData = new userModel({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: password,
          });
          console.log("userData : ", userData);
          // console.log("hiii how are you");
          const registerd = await userData.save();
          console.log("registerd : ", registerd);
          if (registerd) {
            res.status(201).send(registerd);
          } else {
            res.status(404).send("Enter a data");
          }
        }
      }
    } catch (e) {
      res.status(400).send(e);
    }
    ``;
  }
);

router.post(
  "/login",
  [
    body("username", "Enter a user name").exists(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
      }
      const username = req.body.username;
      const password = req.body.password;

      console.log(username + " " + password);
      const user = await userModel.findOne({ username: username });

      if (!user) {
        return res.send({ code: 404, message: "Enter valid user" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      console.log("hiiii");
      const token1 = await user.genrateAuthToken();
      console.log("heloo");
      // console.log();
      // const user1 = await userModel.findOneAndUpdate(
      //   { username: username },
      //   {
      //     tokens: [{ token: token1 }],
      //   },
      //   { new: true }
      // );
      // console.log(user1._id);
      console.log("token1 : ", token1);
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
      res.status(400).send(e);
    }
  }
);

router.get(
  "/register",
  [
    body("username", "Enter a valid user name").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      const userData = await userModel.find();
      if (userData) {
        res.status(200).send(userData);
      } else {
        res.status(400).send();
      }
    } catch (e) {
      res.status(404).send(e);
    }
  }
);

module.exports = router;

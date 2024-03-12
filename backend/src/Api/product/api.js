const express = require("express");
const router = new express.Router();
const ProductModel = require("./schema");
const auth = require("../authorization/auth");
const catagoryModel = require("../Catagory/schema");
const userModel = require("../User/schema");
const jwt = require("jsonwebtoken");

// router.use(auth);

router.post("/product", auth, async (req, res) => {
  try {
    const catagory = req.body.data.category;
    const cName = await catagoryModel.findOne({
      name: catagory,
    });
    console.log(req.user._id);
    const user = await ProductModel({
      // catagoryName: req.body.category,
      title: req.body.data.title,
      description: req.body.data.description,
      image_url: req.body.data.imageURL,
      image_url_1: req.body.data.imageURL1,
      image_url_2: req.body.data.imageURL2,
      image_url_3: req.body.data.imageURL3,
      image_url_4: req.body.data.imageURL4,
      price: req.body.data.price,
      stocks: req.body.data.stocks,
      catagoryId: cName._id,
      userId: req.user._id,
    });

    // console.log(user);

    const creatUser = await user.save();
    return res.status(201).send({
      data: user,
      status: 200,
      message: "product saved successfully.",
    });
  } catch (e) {
    return res.status(401).send(e);
  }
});

router.get("/product", async (req, res) => {
  try {
    const productData = await ProductModel.find();
    if (productData) {
      return res.status(200).send({
        data: productData,
        status: 200,
        message: "product found successfully.",
      });
    } else {
      res.status(400).send({
        data: null,
        status: 400,
        message: "product is not exist.",
      });
    }
  } catch (e) {
    return res.status(401).send(e);
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log("_id : " + _id);
    console.log(req.headers.authorization);
    const token = req.headers.authorization;

    const verifyUser = jwt.verify(
      token.replace("Bearer ", ""),
      "atuhjiokbvdftghyujgdefghyjbcfhhgds"
    );

    console.log(verifyUser);

    const userData = await userModel.findById(verifyUser._id);
    console.log(userData);

    const itemExists = userData.favData.some(
      (item) => item.product.toString() === _id
    );

    console.log(itemExists);
    const productData = await ProductModel.findById(_id);
    // const cName = await catagoryModel.findOne({ name: req.body.catagoryName });

    if (!productData) {
      return res.status(400).send({
        data: null,
        status: 400,
        message: "product is not exist.",
      });
    }

    if (productData && !itemExists) {
      console.log("hiiii");
    }

    if (productData && !itemExists) {
      const responseData = {
        productData: productData,
        isitemExists: false, // Add any additional values you need
      };

      return res.status(200).send({
        data: responseData,
        status: 200,
        message: "product found successfully.",
      });
    }

    if (productData && itemExists) {
      const responseData = {
        productData: productData,
        isitemExists: true, // Add any additional values you need
      };

      return res.status(200).send({
        data: responseData,
        status: 200,
        message: "product found successfully.",
      });
    }
  } catch (e) {
    res.status(401).send(e);
  }
});

router.patch("/product/:id", auth, async (req, res) => {
  try {
    const cName = await catagoryModel.findOne({ name: req.body.catagoryName });

    if (!cName) {
      return res.status(404).send("Category not found");
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        image_url_1: req.body.image_url_1,
        image_url_2: req.body.image_url_2,
        image_url_3: req.body.image_url_3,
        price: req.body.price,
        stocks: req.body.stocks,
        catagoryId: cName._id,
        userId: req.user._id,
      },
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(400).send({
        data: null,
        status: 400,
        message: "product is not exist.",
      });
    }

    return res.status(200).send({
      data: updatedProduct,
      status: 200,
      message: "product found successfully.",
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/product/:id", auth, async (req, res) => {
  try {
    const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.status(400).send({
        data: null,
        status: 400,
        message: "product is not exist.",
      });
    } else {
      return res.status(200).send({
        data: deleteProduct,
        status: 200,
        message: "product found successfully.",
      });
    }
  } catch (e) {}
});

module.exports = router;

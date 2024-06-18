const express = require("express");
const controller = require("../controller/Product");
const cartcontroller = require("../controller/Cart");
const multer = require("multer");
const router = express.Router();

const upload = multer();

router
  .get("/", controller.indexhtml)
  .post("/upload", upload.single("file"), controller.uploadfile)
  .get("/products", controller.allproducts)
  .delete("/delete/:id", controller.deleteProduct)
  .patch("/update/:id" , controller.updateProduct)
  // cart
  .get("/cart", cartcontroller.getcart)
  .post("/cart", cartcontroller.addcart)
  .delete("/cart", cartcontroller.deletecart)
  

exports.routes = router;

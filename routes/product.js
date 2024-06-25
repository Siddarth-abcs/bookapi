const express = require("express");
const controller = require("../controller/Product");
const contactcontroller = require("../controller/contact");
const Ordercontroller = require("../controller/Order");
const multer = require("multer");
const router = express.Router();

const upload = multer();

router
  .get("/", controller.indexhtml)
  // product add
  .get("/products", controller.allproducts)
  .post("/upload", upload.single("file"), controller.uploadfile)
  .patch("/update/:id", controller.updateProduct)
  .delete("/delete/:id", controller.deleteProduct)

  // contact apis
  .get("/allcontact", contactcontroller.allcontact)
  .post("/contact", contactcontroller.contact)
  .delete("/contact/:id", contactcontroller.deletecontact)

  // order apis
  .get("/order", Ordercontroller.getOrder)
  .post("/order", Ordercontroller.Order)
  .delete("/order/:id", Ordercontroller.deleteOrder);

exports.routes = router;

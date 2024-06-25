const express = require("express");
const controller = require("../controller/Product");
const contactcontroller = require("../controller/contact");
const Ordercontroller = require("../controller/Order");
const multer = require("multer");
const router = express.Router();

const upload = multer();

router
  .get("/", controller.indexhtml)
  .post("/upload", upload.single("file"), controller.uploadfile)
  .get("/products", controller.allproducts)
  .delete("/delete/:id", controller.deleteProduct)
  .patch("/update/:id", controller.updateProduct)
  // contact apis
  .post("/contact", contactcontroller.contact)
  .get("/allcontact", contactcontroller.allcontact)
  .delete("/contact/:id", contactcontroller.deletecontact)

  .post("/order", Ordercontroller.Order);

exports.routes = router;

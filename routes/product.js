const express = require("express");
const controller = require("../controller/Product");
const multer = require("multer");
const router = express.Router();

const upload = multer();

router
  .get("/", controller.indexhtml)
  .post("/upload", upload.single("file"), controller.uploadfile)
  .get("/products", controller.allproducts)
  .delete("/delete/:id", controller.deleteProduct)
  .put("/update", controller.updateProduct);

exports.routes = router;

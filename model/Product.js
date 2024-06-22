const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  url: String,
  name: String,
  price: Number,
  discountprice: Number,
  description: String,
});

exports.Product = mongoose.model("Product", productSchema);

const cantactSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

exports.Contact = mongoose.model("Contact", cantactSchema);

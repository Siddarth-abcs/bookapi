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

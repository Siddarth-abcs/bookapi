const mongoose = require("mongoose");
const { Schema } = mongoose;

// product
const productSchema = new Schema({
  url: String,
  name: String,
  price: Number,
  discountprice: Number,
  description: String,
  language: { type: String, required: [true] },
});

exports.Product = mongoose.model("Product", productSchema);

// contact
const cantactSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

exports.Contact = mongoose.model("Contact", cantactSchema);

// order
const OrderSchema = new Schema({
  clientname: { type: String, required: [true] },
  clientemail: { type: String, required: [true] },
  clientnumber: { type: Number, required: [true] },
  clientinfo: [String],
  orderdate: { type: Date, default: Date.now },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  totalprice: { type: Number, required: [true] },
});

exports.Order = mongoose.model("Order", OrderSchema);

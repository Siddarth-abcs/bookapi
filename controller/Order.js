const model = require("../model/Product");
const Order = model.Order;
const path = require("path");

exports.getOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate('products');
    res.status(200).json(orders);
    console.log(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to get orders" });
  }
};

exports.Order = async (req, res) => {
  try {
    const {
      clientname,
      clientemail,
      clientnumber,
      clientinfo,
      products,
      totalprice,
      paymentmethod,
      orderdate,
      orderid,
      paymentId,
    } = req.body;

    // Assuming 'products' in req.body is an array of product IDs
    const order = new Order({
      clientname,
      clientemail,
      clientnumber,
      clientinfo,
      products,
      totalprice,
      paymentmethod,
      orderdate,
      orderid,
      paymentId,
    });
    
    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Error placing order:", err);
    res
      .status(400)
      .json({ message: "Error placing order", error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


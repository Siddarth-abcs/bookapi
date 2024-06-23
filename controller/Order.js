const model = require("../model/Product");
const Order = model.Order;
const path = require("path");

exports.Order = async (req, res) => {
  try {
    const { clientname, clientemail, clientnumber, clientinfo, products, totalprice } = req.body;

    // Assuming 'products' in req.body is an array of product IDs
    const order = new Order({
      clientname,
      clientemail,
      clientnumber,
      clientinfo,
      products,
      totalprice,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(400).json({ message: "Error placing order", error: err.message });
  }
};

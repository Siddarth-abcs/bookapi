const { request } = require("express");
const axios = require("axios");

const User = require("../model/Product").User;

exports.userdata = async (req, res) => {
  try {
    // Get IP address of the requester
    const ip = res.ip;

    // Get user-agent information (device and browser details)
    const userAgent = req.headers["user-agent"];

    // Create a new user document
    const newUser = new User({
      ip: ip,
      userAgent: userAgent,
    });

    // Save the user document to the database
    await newUser.save();

    // Count the number of stored exports
    const count = await User.countDocuments();

    // Respond with a JSON object or any other response format
    res.json({
      ip: ip,
      userAgent: userAgent,
      totalExports: count,
    });
  } catch (error) {
    console.error("Error storing user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

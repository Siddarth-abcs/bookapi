const axios = require("axios");
const User = require("../model/Product").User;

exports.userdata = async (req, res) => {
  try {
    // Get IP address of the requester
    let ip;

    try {
      const ipResponse = await axios.get("https://api.ipify.org?format=json");
      ip = ipResponse.data.ip;
      console.log("User IP address:", ip, typeof ip);
    } catch (error) {
      console.error("Error fetching IP address:", error.message);
      res.status(500).send("Error fetching IP address");
      return; // Exit the function to prevent further execution
    }

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

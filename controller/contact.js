const model = require("../model/Product");
const Contact = model.Contact;
const path = require("path");

exports.contact = async (req, res) => {
  //   console.log(contact.contact);
  const { name, email, message } = req.body;
  try {
    const newContact = new Contact({
      name,
      email,
      message,
    });
    await newContact.save();
    res.status(201).json({ newContact, message: "Contact added successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({ message: "Error adding contact" });
  }
};

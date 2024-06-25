const model = require("../model/Product");
const Contact = model.Contact;
const path = require("path");

exports.allcontact = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletecontact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.contact = async (req, res) => {
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

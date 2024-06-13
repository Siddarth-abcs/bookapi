const model = require("../model/Product");
const Product = model.Product;
const admin = require("firebase-admin");
const path = require("path");

exports.indexhtml = (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
};

// Initialize Firebase Admin SDK
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "project-93474.appspot.com",
});

const storage = admin.storage().bucket();
exports.uploadfile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const { name, price, discountprice, description } = req.body;
  const uploadedFile = req.file;
  const fileRef = storage.file(uploadedFile.originalname);

  try {
    await fileRef.save(uploadedFile.buffer, {
      contentType: uploadedFile.mimetype,
      public: true,
    });

    const downloadURL = `https://storage.googleapis.com/${storage.name}/${fileRef.name}`;

    const newProduct = await Product.create({
      name,
      price,
      discountprice,
      description,
      url: downloadURL,
    });

    res.json({ message: "File uploaded successfully!", product: newProduct });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file");
  }
};

exports.allproducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error fetching products" });
    });
};

// update product
exports.updateProduct = async (req, res) => {
  const id = String(req.params.id);
  const { name, price, discountprice, description } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, discountprice, description },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found for update" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = String(req.params.id); // Convert id to string
    // console.log(typeof id); // Log the type of id to the console

    // Attempt to delete the product
    const result = await Product.deleteOne({ _id: id });

    // Check if a product was deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send the result of the deletion in the response
    res.json(result);
  } catch (error) {
    // Handle any errors that occur during the deletion
    res.status(500).json({ message: error.message });
  }
};

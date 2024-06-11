require('dotenv').config();
const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Schema } = mongoose;

const app = express();
app.use(cors());

// Initialize MongoDB connection
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");
    } catch (err) {
      console.error("Database connection error:", err);
      }
      }
      
      main();
      
      const productSchema = new Schema({
        url: String, 
        name: String,
        price: Number,
        discountprice: Number,
        description: String
        });
        
        const Product = mongoose.model('Product', productSchema);
        
        // Initialize Firebase Admin SDK
        const serviceAccount = require('./serviceAccountKey.json');
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          storageBucket: "project-93474.appspot.com"
          });
          
          const storage = admin.storage().bucket(); 
          
          const upload = multer();
          app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h1>Upload Your App</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" id="appFile" name="file" required><br><br>
      <label for="appName">App Name:</label><br>
      <input type="text" id="appName" name="name" required><br><br>
      <label for="appPrice">Price:</label><br>
      <input type="number" id="appPrice" name="price" required><br><br>
      <label for="appDiscountPrice">Discount Price:</label><br>
      <input type="number" id="appDiscountPrice" name="discountprice"><br><br>
      <label for="appDescription">Description:</label><br>
      <textarea id="appDescription" name="description" required></textarea><br><br>
      <button type="submit">Upload</button>
    </form>
  `);
});

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const { name, price, discountprice, description } = req.body;
  const uploadedFile = req.file;
  const fileRef = storage.file(uploadedFile.originalname);

  try {
    await fileRef.save(uploadedFile.buffer, {
      contentType: uploadedFile.mimetype,
      public: true
    });

    const downloadURL = `https://storage.googleapis.com/${storage.name}/${fileRef.name}`;

    const newProduct = await Product.create({
      name,
      price,
      discountprice,
      description,
      url: downloadURL
    });

    res.json({ message: 'File uploaded successfully!', product: newProduct });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

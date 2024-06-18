require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const session = require('express-session')
const MongoStore = require('connect-mongo')

const productrouter = require("./routes/product");

const app = express();
// cors use for api request from anywhere and also define for one website
app.use(cors({ origin: '*' }));

const PORT = process.env.PORT || 8080;
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}
main();

// Session configuration
const mongostore = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  collectionName: 'sessions',
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET + Math.random(),
    store: mongostore,
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false,
      maxAge: 7 * 24  * 60 * 60 * 1000 },
  })
);

app.use("/", productrouter.routes);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

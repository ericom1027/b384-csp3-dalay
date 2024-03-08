// [SECTION] Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// Allows our backend application to be available to our frontend application
// Allows us to control the app's Cross-Origin Resources Sharing settings
const cors = require("cors");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

// [SECTION] Environment Setup
const port = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.setHeader("Access.Control-Allow-Credentials", "true");
  res.send("API is running..");
});

// [SECTION] Database Connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB Atlas successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
};

connectToDatabase();

// [SECTION] Backend Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);

// [SECTION] Server Gateway Response
if (require.main === module) {
  // "process.env.PORT || port" will use the environment variable if it is avaiable OR will used port 4000 if none is defined
  app.listen(process.env.PORT || port, () => {
    console.log(`API is now online on port ${process.env.PORT || port}`);
  });
}

module.exports = { app, mongoose };

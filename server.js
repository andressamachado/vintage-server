require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");

// server running port
const PORT = process.env.PORT || 8080;

// import routes
const userRoutes = require("./routes/userRoutes");
const productsRoutes = require("./routes/productRoutes");

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// mount router modules
app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

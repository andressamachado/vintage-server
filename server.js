require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

// server running port
const PORT = process.env.PORT || 8080;

// import routes
const userRoutes = require("./routes/user-routes");

app.use(cors());
app.use(express.json());

// mount router modules
app.use("/api/users", userRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

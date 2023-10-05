require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

// server running port
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

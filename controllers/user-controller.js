require("dotenv").config();
const knex = require("knex")(require("../database/knexfile"));

// GET http://127.0.0.1:5050/api/users/
// Returns a list with all the users in the Database.
const getAllUsers = async (req, res) => {
  try {
    const users = await knex
      .select("first_name", "last_name", "email", "phone", "address", "isAdmin")
      .from("users");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching inventory data",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
};

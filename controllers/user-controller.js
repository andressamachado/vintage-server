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

// GET http://127.0.0.1:5050/api/users/:userId
// Returns a user from the Database.
const getUserById = async (req, res) => {
  try {
    // SELECT returns a list of instances found in the database.
    const user = await knex
      .select("first_name", "last_name", "email", "phone", "address", "isAdmin")
      .from("users")
      .where("id", req.params.userId);

    // No user associated with the ID.
    if (user.length === 0) {
      res.status(404).send(`User with ID [ ${req.params.userId} ] not found`);
    }

    // If more than one user is found, return an error.
    if (user.length > 1) {
      res
        .status(500)
        .send(
          `ID conflict. Multiple users found with ID [${req.params.userId}]`
        );
    }

    res.status(200).json(user[0]);
  } catch (err) {
    res.status(404).send(`Error retrieving items: ${err}`);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
};

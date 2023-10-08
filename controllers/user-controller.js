require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

// POST http://127.0.0.1:5050/api/users/register
// Returns the newly created user data object inserted in the database.
const createUser = async (req, res) => {
  const { first_name, last_name, email, password, phone, address, isAdmin } =
    req.body;

  // encrypt password and updates user`s password value
  const hashedPassword = bcrypt.hashSync(password, 10);
  const userToAdd = {
    ...req.body,
    password: hashedPassword,
  };

  try {
    const [id] = await knex("users").insert(userToAdd).returning("*");
    const [addedUser] = await knex
      .select("first_name", "last_name", "email", "phone", "address", "isAdmin")
      .from("users")
      .where("id", id);

    res.status(201).json(addedUser);
  } catch (error) {
    res.status(500).json({ error: "Could not add user to the database" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email is in the database
    const user = await knex("users").where({ email: email }).first();
    if (!user) return res.status(400).send("Invalid email");

    // Check if the password matches the one in the database
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) return res.status(400).send("Invalid password");

    // create jwt for authenticated user
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ error: "Could not log in" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
};

const router = require("express").Router();
const userController = require("../controllers/user-controller");

// eg. GET http://127.0.0.1:5050/api/users/
router.route("/").get(userController.getAllUsers);

// eg. GET http://127.0.0.1:5050/api/users/:userId
router.route("/:userId").get(userController.getUserById);

module.exports = router;

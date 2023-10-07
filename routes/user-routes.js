const router = require("express").Router();
const userController = require("../controllers/user-controller");

// eg. GET http://127.0.0.1:5050/api/users/
router.route("/").get(userController.getAllUsers);

module.exports = router;

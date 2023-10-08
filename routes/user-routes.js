const router = require("express").Router();
const userController = require("../controllers/user-controller");
const { validateUser } = require("../utils/userValidation");

// eg. GET http://127.0.0.1:5050/api/users/
router
  .route("/")
  .get(userController.getAllUsers)
  .post(validateUser, userController.createUser);

// eg. GET http://127.0.0.1:5050/api/users/:userId
router.route("/:userId").get(userController.getUserById);

module.exports = router;

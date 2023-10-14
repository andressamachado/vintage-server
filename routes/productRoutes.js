const router = require("express").Router();
const productController = require("../controllers/productController");

// eg. GET http://127.0.0.1:5050/api/products/
router.route("/").get(productController.getAllProducts);

// eg. POST http://127.0.0.1:5050/api/products/upload
router.route("/upload").post(productController.uploadProduct);

module.exports = router;

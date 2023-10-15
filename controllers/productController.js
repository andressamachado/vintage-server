const knex = require("knex")(require("../database/knexfile"));

// GET http://127.0.0.1:5050/api/products/
// Returns a list with all the products in the Database.
const getAllProducts = async (req, res) => {
  try {
    const products = await knex
      .select("title", "image", "description", "price")
      .from("products");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching inventory data",
      error: error.message,
    });
  }
};

// POST http://127.0.0.1:5050/api/products/upload
// Returns the newly created product data object inserted in the database.
const uploadProduct = async (req, res) => {
  const { name, data: img } = req.files.image;

  try {
    const [productToAdd] = await knex
      .insert({
        image: img,
        ...req.body,
      })
      .into("products");

    const [data] = await knex
      .select("*")
      .from("products")
      .where({ id: productToAdd });

    const { title, image, description, price, id } = data;

    const newProduct = { title, image, description, price, id };

    return res.status(200).json(newProduct);
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred while fetching product data",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  uploadProduct,
};

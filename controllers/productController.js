const { loginUser } = require("./userController");

const knex = require("knex")(require("../database/knexfile"));

// GET http://127.0.0.1:5050/api/products/
// Returns a list with all the products in the Database.
const getAllProducts = async (req, res) => {
  const category = req.query.category;

  try {
    let products;
    if (category) {
      products = await knex
        .select("title", "image", "description", "price", "category", "id")
        .from("products")
        .where(
          "category",
          category.charAt(0).toUpperCase() + category.slice(1)
        );
    } else {
      products = await knex
        .select("title", "image", "description", "price", "category", "id")
        .from("products");
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching inventory data",
      error: error.message,
    });
  }
};

// GET http://127.0.0.1:5050/api/products/:productId
// Returns a user from the Database.
const getProductById = async (req, res) => {
  try {
    // SELECT returns a list of instances found in the database.
    const product = await knex
      .select("id", "title", "description", "image", "price", "category")
      .from("products")
      .where("id", req.params.productId);

    // No product associated with the ID.
    if (product.length === 0) {
      res
        .status(404)
        .send(`Product with ID [ ${req.params.productId} ] not found`);
    }

    // If more than one user is found, return an error.
    if (product.length > 1) {
      res
        .status(500)
        .send(
          `ID conflict. Multiple users found with ID [${req.params.productId}]`
        );
    }

    res.status(200).json(product[0]);
  } catch (err) {
    res.status(404).send(`Error retrieving items: ${err}`);
  }
};

// POST http://127.0.0.1:5050/api/products/upload
// Returns the newly created product data object inserted in the database.
const uploadProduct = async (req, res) => {
  const { name, data: img } = req.files.image;

  console.log(req.files);

  try {
    const [productToAdd] = await knex
      .insert({
        image: img,
        ...req.body,
      })
      .into("products");

    console.log(productToAdd);
    const [data] = await knex
      .select("*")
      .from("products")
      .where({ id: productToAdd });

    const { title, image, description, price, category, id } = data;

    const newProduct = { title, image, description, price, category, id };

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
  getProductById,
};

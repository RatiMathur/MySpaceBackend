const productRouter = require("express").Router();
const Product = require("../models/product");
const {
  validateName,
  validateDescription,
  validatePrice,
  validateQuantity,
} = require("../Validators/validateproduct");

// Get All Products
productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get specific Product
productRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new Product
productRouter.post("/", async (req, res) => {
  const { name, description, price, quantity } = req.body;

  const productEntity = new Product({
    name,
    description,
    price,
    quantity,
  });

  const validName = validateName(name);
  if (name.isInvalid) {
    return res.status(400).json(validName);
  }

  const validDescription = validateDescription(description);
  if (description.isInvalid) {
    return res.status(400).json(validDescription);
  }

  const validPrice = validatePrice(price);
  if (price.isInvalid) {
    return res.status(400).json(validPrice);
  }

  const validQuantity = validateQuantity(quantity);
  if (quantity.isInvalid) {
    return res.status(400).json(validQuantity);
  }

  try {
    await productEntity.save();
    res.json(productEntity);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a Product
productRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, description, price, quantity } = req.body;

  const validName = validateName(name);
  if (name.isInvalid) {
    return res.status(400).json(validName);
  }

  const validDescription = validateDescription(description);
  if (description.isInvalid) {
    return res.status(400).json(validDescription);
  }

  const validPrice = validatePrice(price);
  if (price.isInvalid) {
    return res.status(400).json(validPrice);
  }

  const validQuantity = validateQuantity(quantity);
  if (quantity.isInvalid) {
    return res.status(400).json(validQuantity);
  }

  try {
    const productEntity = await Product.findById(id);
    productEntity.name = name;
    productEntity.description = description;
    productEntity.price = price;
    productEntity.quantity = quantity;

    await productEntity.save();
    res.json(productEntity);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a Product
productRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const productEntity = await Product.findById(id);
    await productEntity.deleteOne();
    res.json(productEntity);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = productRouter;

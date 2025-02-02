import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

// Get all products
export const getAllProduct = async (req, res, next) => {
  try {
    const product = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(product);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Get a single product by ID
export const getSingleProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return next(errorHandler(404, "Product Not Found"));
    }
    res.status(200).json(product);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Create a new product
export const createProduct = async (req, res, next) => {
  const { name, description, price, quantity, image } = req.body;

  if (!name || !description || !price || !quantity) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const product = await Product.create({ name, description, price, quantity, image });
    res.status(201).json(product);
  } catch (error) {
    next(errorHandler(500, "Failed to create product"));
  }
};

// Update a product
export const updateProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });
    if (!product) {
      return next(errorHandler(404, "Product Not Found"));
    }
    res.status(200).json(product);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Delete a product
export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return next(errorHandler(404, "Product Not Found"));
    }
    res.json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

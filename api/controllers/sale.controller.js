import Sale from "../models/sale.model.js";
import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new sale
export const createSale = async (req, res, next) => {
  const { productId, quantitySold, customerDetails } = req.body;

  if (!productId || !quantitySold || !customerDetails) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return next(errorHandler(404, "Product Not Found"));
    }

    if (product.quantity < quantitySold) {
      return next(errorHandler(400, "Not enough stock"));
    }

    // Calculate total price
    const totalPrice = product.price * quantitySold;

    // Create the sale record
    const sale = await Sale.create({
      productId,
      quantitySold,
      totalPrice,
      customerDetails,
    });

    // Update product quantity
    product.quantity -= quantitySold;
    await product.save();

    res.status(201).json(sale);
  } catch (error) {
    next(errorHandler(500, "Failed to process sale"));
  }
};

// Get all sales
export const getAllSale = async (req, res, next) => {
  try {
    const sale = await Sale.find({}).populate("productId").sort({ createdAt: -1 });
    res.status(200).json(sale);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Get a single sale by ID
export const getSingleSale = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sale = await Sale.findById(id).populate("productId");
    if (!sale) {
      return next(errorHandler(404, "Sale Not Found"));
    }
    res.status(200).json(sale);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

import Payment from "../models/payment.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";

// Get all payments
export const getAllPayment = async (req, res, next) => {
  try {
    const payment = await Payment.find({}).sort({ createdAt: -1 });
    res.status(200).json(payment);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Get a single payment by ID
export const getSinglePayment = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such payment" });
  }

  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return next(errorHandler(404, "Payment Not Found"));
    }
    res.status(200).json(payment);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Create a new payment
export const createPayment = async (req, res, next) => {
  const { userId, amount, method, transactionId } = req.body;

  if (!userId || !amount || !method || !transactionId) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const payment = await Payment.create({ userId, amount, method, transactionId });
    res.status(201).json(payment);
  } catch (error) {
    next(errorHandler(500, "Failed to process payment"));
  }
};

// Update payment status (e.g., mark as completed)
export const updatePaymentStatus = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such payment" });
  }

  try {
    const payment = await Payment.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!payment) {
      return next(errorHandler(404, "Payment Not Found"));
    }
    res.status(200).json(payment);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Delete a payment record
export const deletePayment = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such payment" });
  }

  try {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      return next(errorHandler(404, "Payment Not Found"));
    }
    res.json({ success: true, message: "Payment record deleted successfully" });
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

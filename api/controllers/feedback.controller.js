import Feedback from "../models/feedback.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";

// Get all feedback
export const getAllFeedback = async (req, res, next) => {
    try {
        const feedback = await Feedback.find({}).sort({ createdAt: -1 });
        res.status(200).json(feedback);
    } catch (error) {
        next(errorHandler(500, "Server Error"));
    }
};

// Get a single feedback by ID
export const getSingleFeedback = async (req, res, next) => {
    const { id } = req.params;
    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return next(errorHandler(404, "Feedback Not Found"));
        }
        res.status(200).json(feedback);
    } catch (error) {
        next(errorHandler(500, "Server Error"));
    }
};

// Create new feedback
export const createFeedback = async (req, res, next) => {
    const { name, email, message, rating } = req.body;

    if (!name || !email || !message || !rating) {
        return next(errorHandler(400, "All fields are required"));
    }

    try {
        const feedback = await Feedback.create({ name, email, message, rating });
        res.status(201).json(feedback);
    } catch (error) {
        next(errorHandler(500, "Failed to create feedback"));
    }
};

// Update feedback
export const updateFeedback = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such feedback" });
    }

    try {
        const feedback = await Feedback.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });
        if (!feedback) {
            return next(errorHandler(404, "Feedback Not Found"));
        }
        res.status(200).json(feedback);
    } catch (error) {
        next(errorHandler(500, "Server Error"));
    }
};

// Delete feedback
export const deleteFeedback = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such feedback" });
    }

    try {
        const feedback = await Feedback.findByIdAndDelete(id);
        if (!feedback) {
            return next(errorHandler(404, "Feedback Not Found"));
        }
        res.json({ success: true, message: "Deleted Successfully" });
    } catch (error) {
        next(errorHandler(500, "Server Error"));
    }
};

import Enquiry from "../models/enquiry.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";

// Get all enquiries
export const getAllEnquiry = async (req, res, next) => {
    try {
        const enquiry = await Enquiry.find({}).sort({ createdAt: -1 });
        res.status(200).json(enquiry);
    } catch (error) {
        next(errorHandler(500, "Server Error"));
    }
};

// Get a single enquiry by ID
export const getSingleEnquiry = async (req, res, next) => {
    const { id } = req.params;
    try {
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return next(errorHandler(404, "Enquiry Not Found"));
        }
        res.status(200).json(enquiry);
    } catch (error) {
        next(errorHandler(500, "Server Error"));
    }
};

// Create a new enquiry
export const createEnquiry = async (req, res, next) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return next(errorHandler(400, "All fields are required"));
    }

    try {
        const enquiry = await Enquiry.create({ name, email, subject, message });
        res.status(201).json(enquiry);
    } catch (error) {
        next(errorHandler(500, "Failed to create enquiry"));
    }
};

// Update an enquiry (e.g., mark as resolved)
export const updateEnquiry = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such enquiry" });
    }

    try {
        const enquiry = await Enquiry.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });
        if (!enquiry) {
            return next(errorHandler(404, "Enquiry Not Found"));
        }
        res.status(200).json(enquiry);
    } catch (error) {
        next(errorHandler(500, "Server Error"));
    }
};

// Delete an enquiry
export const deleteEnquiry = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such enquiry" });
    }

    try {
        const enquiry = await Enquiry.findByIdAndDelete(id);
        if (!enquiry) {
            return next(errorHandler(404, "Enquiry Not Found"));
        }
        res.json({ success: true, message: "Deleted Successfully" });
    } catch (error) {
        next(errorHandler(500, "Server Error"));
    }
};

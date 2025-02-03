import Admin from "../models/admin.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";
import createToken from "../utils/token.js";

// Get all admins
export const getAllAdmin = async (req, res, next) => {
  try {
    const admins = await Admin.find({}).sort({ createdAt: -1 });
    res.status(200).json(admins);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Get a single admin by ID
export const getSingleAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return next(errorHandler(404, "Admin Not Found"));
    }
    res.status(200).json(admin);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Delete an admin
export const deleteAdmin = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such admin" });
  }

  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return next(errorHandler(404, "Admin Not Found"));
    }
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Update an admin
export const updateAdmin = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, phone, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such admin" });
  }

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { username, email, phone, image },
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      return next(errorHandler(404, "Admin Not Found"));
    }

    res.status(200).json(updatedAdmin);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Signup an admin
export const signupAdmin = async (req, res, next) => {
  const { username, email, phone, password, image } = req.body;

  if (!username || !email || !phone || !password) {
    return next(errorHandler(400, "All Fields are Required"));
  }

  try {
    const admin = await Admin.signup(username, email, phone, password, image);
    const token = createToken(admin._id);
    res.status(200).json({ email, phone, image, token });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

// Signin an admin
export const signinAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "All Fields are Required"));
  }

  try {
    const admin = await Admin.signin(email, password);
    const token = createToken(admin._id);
    res.status(200).json({ email, token });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

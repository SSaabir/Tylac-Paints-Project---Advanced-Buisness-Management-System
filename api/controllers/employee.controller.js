import Employee from "../models/employee.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";
import createToken from "../utils/token.js";

// Get all employees
export const getAllEmployee = async (req, res, next) => {
  try {
    const employees = await Employee.find({}).sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Get a single employee by ID
export const getSingleEmployee = async (req, res, next) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return next(errorHandler(404, "Employee Not Found"));
    }
    res.status(200).json(employee);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Delete an employee
export const deleteEmployee = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such employee" });
  }

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return next(errorHandler(404, "Employee Not Found"));
    }
    res.json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Update an employee
export const updateEmployee = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, phone, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such employee" });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { username, email, phone, image },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return next(errorHandler(404, "Employee Not Found"));
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

// Employee Signup
export const signupEmployee = async (req, res, next) => {
  const { username, email, phone, password, image } = req.body;

  if (!username || !email || !phone || !password) {
    return next(errorHandler(400, "All Fields are Required"));
  }

  try {
    const employee = await Employee.signup(username, email, phone, password, image);
    const token = createToken(employee._id);
    res.status(200).json({ email, phone, image, token });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

// Employee Signin
export const signinEmployee = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "All Fields are Required"));
  }

  try {
    const employee = await Employee.signin(email, password);
    const token = createToken(employee._id);
    res.status(200).json({ email, token });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

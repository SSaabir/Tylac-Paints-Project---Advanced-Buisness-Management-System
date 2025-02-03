import Customer from '../models/customer.model.js';
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';
import createToken from '../utils/token.js';

// Get all customers
export const getAllCustomer = async (req, res, next) => {
    try {
        const customers = await Customer.find({}).sort({ createdAt: -1 });
        res.status(200).json(customers);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
};

// Get a single customer by ID
export const getSingleCustomer = async (req, res, next) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return next(errorHandler(404, 'Customer Not Found'));
        }
        res.status(200).json(customer);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
};

// Delete a customer
export const deleteCustomer = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such customer' });
    }

    try {
        const customer = await Customer.findByIdAndDelete(id);
        if (!customer) {
            return next(errorHandler(404, 'Customer Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
};

// Update a customer
export const updateCustomer = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such customer' });
    }

    try {
        const customer = await Customer.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });
        if (!customer) {
            return next(errorHandler(404, 'Customer Not Found'));
        }
        res.status(200).json(customer);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
};

// Signup customer
export const signupC = async (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, password, address, image, dob } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !password || !address || !dob) {
        return next(errorHandler(400, 'All Fields are Required'));
    }

    try {
        const customer = await Customer.signup(firstName, lastName, email, phoneNumber, password, address, image, dob);
        const token = createToken(customer._id);
        res.status(200).json({ email, token });
    } catch (error) {
        next(errorHandler(400, error.message));
    }
};

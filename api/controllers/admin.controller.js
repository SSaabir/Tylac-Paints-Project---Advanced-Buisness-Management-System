import Admin from '../models/admin.model.js';
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';
import createToken from '../utils/token.js';

export const getAllAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.find({}).sort({ createdAt: -1 });
        res.status(200).json(admin);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
};

export const getSingleAdmin = async (req, res, next) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return next(errorHandler(404, 'Admin Not Found'));
        }
        res.status(200).json(admin);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
};

export const deleteAdmin = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such admin' });
    }

    try {
        const admin = await Admin.findByIdAndDelete(id);
        if (!admin) {
            return next(errorHandler(404, 'Admin Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
};

export const updateAdmin = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such admin' });
    }

    try {
        const admin = await Admin.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });
        if (!admin) {
            return next(errorHandler(404, 'Admin Not Found'));
        }
        res.status(200).json(admin);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
};

export const signupAdmin = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(errorHandler(400, 'All Fields are Required'));
    }

    try {
        const admin = await Admin.signup(username, email, password);
        const token = createToken(admin._id);
        res.status(200).json({ email, token });
    } catch (error) {
        next(errorHandler(400, error.message));
    }
};

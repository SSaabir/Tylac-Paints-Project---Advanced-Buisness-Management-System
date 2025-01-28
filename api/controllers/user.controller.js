import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';

export const test = (req, res) =>
    {res.json({message: 'API is Working'});
};

export const getAllUser = async (req, res, next) => {
    const users = await User.find({}).sort({createdAt: -1});
    res.status(200).json(users);
};

export const getSingleUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);

    if(!user){
        return next(errorHandler(400, 'User Not Found'));
    }
        res.status(200).json(user);
};

export const deleteUser = async (req, res, next) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such User'})
    }

    const user = await User.findByIdAndDelete(id);

    if(!user){
        return next(errorHandler(400, 'User Not Found'));
    }
    res.json({message: 'Deleted Successfully'})
};

export const updateUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such User'})
    }

    const user = await User.findByIdAndUpdate(id, 
        {...req.body}, 
        {new: true, runValidators: true});

        if(!user){
            return next(errorHandler(400, 'User Not Found'));
        }

        res.status(200).json(user);
};

export const addUser = async (req, res, next) => {
    const {username, email, password} = req.body
        
    try {
        const user = await User.create({username, email, password})    
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};


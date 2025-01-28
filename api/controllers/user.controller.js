import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';
import createToken from '../utils/token.js';


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

export const signupC = async (req, res, next) => {
    const {username, email, password} = req.body

    if (!username || !email || !password || password==='' || username==='' || email===''){
        next(errorHandler(400, 'All Fields are Required'));
  } 

    try {
        const user = await User.signup(username, email, password);
        //create token 
        const token = createToken(user._id);

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};


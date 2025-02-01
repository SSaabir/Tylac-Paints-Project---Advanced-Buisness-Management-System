import Customer from '../models/customer.model.js'
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';
import createToken from '../utils/token.js';


export const getAllCustomer = async (req, res, next) => {
    const customers = await Customer.find({}).sort({createdAt: -1});
    res.status(200).json(customers);
};

export const getSingleCustomer = async (req, res) => {
    const {id} = req.params;
    const customer = await Customer.findById(id);

    if(!customer){
        return next(errorHandler(400, 'customer Not Found'));
    }
        res.status(200).json(customer);
};

export const deleteCustomer = async (req, res, next) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such customer'})
    }

    const customer = await Customer.findByIdAndDelete(id);

    if(!customer){
        return next(errorHandler(400, 'customer Not Found'));
    }
    res.json({message: 'Deleted Successfully'})
};

export const updateCustomer = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such customer'})
    }

    const customer = await Customer.findByIdAndUpdate(id, 
        {...req.body}, 
        {new: true, runValidators: true});

        if(!user){
            return next(errorHandler(400, 'customer Not Found'));
        }

        res.status(200).json(customer);
};

export const signupC = async (req, res, next) => {
    const {username, email, password} = req.body

    if (!username || !email || !password || password==='' || username==='' || email===''){
        next(errorHandler(400, 'All Fields are Required'));
  } 

    try {
        const customer = await Customer.signup(username, email, password);
        //create token 
        const token = createToken(customer._id);

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};


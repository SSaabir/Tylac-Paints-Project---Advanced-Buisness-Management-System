import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async(req, res, next) =>{
    const {username, email, password} = req.body;

    if (!username || !email || !password || password==='' || username==='' || email===''){
      next(errorHandler(400, 'All Fields are Required'));
} 
const hashPassword = bcryptjs.hashSync(password, 10);
const newUser =new User({username, email, password: hashPassword});

try {
    await newUser.save();
    res.json({message: 'signup successfull'});
    
} catch (error) {
    next(error);
}
};
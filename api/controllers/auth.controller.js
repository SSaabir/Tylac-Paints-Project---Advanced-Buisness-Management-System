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

export const signin = async (req, res, next) => {
     const {email, password} = req.body;

     if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All Fields are Required'));
     }

     try {
        const validUser = await User.findOne({email});

        if (!validUser) {
            next(errorHandler(404,'User Not Found!'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            next(errorHandler(400, 'Invalid Password'));
        }
     } catch (error) {
        next(error);
     }
};
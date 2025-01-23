import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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
           return next(errorHandler(400, 'Invalid Password'));
        }

        const token = jwt.sign(
            {userId: validUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '30d'});

            const {password: pass, ...rest} = validUser._doc;
            res.status(200).cookie('access_token', token, {
                httpOnlly: true,
            })
            .json(rest);
     } catch (error) {
        next(error);
     }
};
import Customer from '../models/customer.model.js'
import Admin from '../models/admin.model.js'
import { errorHandler } from '../utils/error.js';
import createToken from '../utils/token.js';
import Employee from '../models/employee.model.js';

export const signin = async (req, res, next) => {
     const {email, password} = req.body;

     if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All Fields are Required'));
     }

     try {
      let user, role;
      if(email.match(/^[a-zA-Z0-9._%+-]+@admin\.tylac\.lk$/)){
         user = await Admin.signin(email, password);
         console.log('Email is valid for admin domain');
         role = 'Admin';
      } else if (email.match(/^[a-zA-Z0-9._%+-]+@employee\.tylac\.lk$/)){
         user = await Employee.signin(email, password);
         console.log('Email is valid for employee domain');
         role = 'Employee';
      } else {
        user = await Customer.signin(email, password);
        console.log('Email is valid for customer domain');
        role = 'Customer';
      }
        const token = createToken(user._id);

        res.status(200).json({role, email, token});
     } catch (error) {
      res.status(400).json({error: error.message})
   }
};
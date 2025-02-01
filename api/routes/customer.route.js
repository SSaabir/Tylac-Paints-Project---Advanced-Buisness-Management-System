import express from 'express'
import { signupC, getAllCustomer, getSingleCustomer, deleteCustomer, updateCustomer } from '../controllers/customer.controller.js' 

const router = express.Router();

//get all users
router.get('/', getAllCustomer);

//get a single user
router.get('/:id', getSingleCustomer);

//add a new user
router.post('/signup', signupC);

//delete a user
router.delete('/:id', deleteCustomer);

//update a user
router.patch('/:id', updateCustomer);


export default router;
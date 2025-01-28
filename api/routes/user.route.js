import express from 'express'
import { signupC, getAllUser, getSingleUser, deleteUser, updateUser } from '../controllers/user.controller.js' 

const router = express.Router();

//get all users
router.get('/', getAllUser);

//get a single user
router.get('/:id', getSingleUser);

//add a new user
router.post('/signup', signupC);

//delete a user
router.delete('/:id', deleteUser);

//update a user
router.patch('/:id', updateUser);


export default router;
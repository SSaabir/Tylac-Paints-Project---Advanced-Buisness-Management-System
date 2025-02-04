import express from 'express';
import multer from 'multer';
import { signupC, getAllCustomer, getSingleCustomer, deleteCustomer, updateCustomer } from '../controllers/customer.controller.js';

// Set up the multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the directory where the file will be saved
        cb(null, './uploads/'); // `uploads` folder should be created in your root directory
    },
    filename: (req, file, cb) => {
        // Set the file name as a timestamp + the original file name
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Initialize Multer with the storage configuration
const upload = multer({ storage });

// Create the router
const router = express.Router();

// GET all users
router.get('/', getAllCustomer);

// GET a single user
router.get('/:id', getSingleCustomer);

// POST - Signup a new user with file upload
router.post('/signup', upload.single('profileImage'), signupC); // `profileImage` is the field name for the file

// DELETE a user
router.delete('/:id', deleteCustomer);

// UPDATE a user
router.patch('/:id', updateCustomer);

export default router;

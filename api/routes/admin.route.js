import express from 'express';
import { signupAdmin, getAllAdmin, getSingleAdmin, deleteAdmin, updateAdmin } from '../controllers/admin.controller.js';

const router = express.Router();

// Get all admins
router.get('/', getAllAdmin);

// Get a single admin
router.get('/:id', getSingleAdmin);

// Add a new admin
router.post('/signup', signupAdmin);

// Delete an admin
router.delete('/:id', deleteAdmin);

// Update an admin
router.patch('/:id', updateAdmin);

export default router;

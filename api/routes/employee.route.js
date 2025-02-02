import express from 'express';
import { 
    signupEmployee, 
    getAllEmployee, 
    getSingleEmployee, 
    deleteEmployee, 
    updateEmployee 
} from '../controllers/employee.controller.js';

const router = express.Router();

// Get all employees
router.get('/', getAllEmployee);

// Get a single employee
router.get('/:id', getSingleEmployee);

// Add a new employee
router.post('/signup', signupEmployee);

// Delete an employee
router.delete('/:id', deleteEmployee);

// Update an employee
router.patch('/:id', updateEmployee);

export default router;

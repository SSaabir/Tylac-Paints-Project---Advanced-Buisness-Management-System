import express from 'express';
import { 
    createSale, 
    getAllSale, 
    getSingleSale 
} from '../controllers/sale.controller.js';

const router = express.Router();

// Create a new sale
router.post('/', createSale);

// Get all sales
router.get('/', getAllSale);

// Get a single sale by ID
router.get('/:id', getSingleSale);

export default router;

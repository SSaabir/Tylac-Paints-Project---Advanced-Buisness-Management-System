import express from 'express';
import { 
    createProduct, 
    getAllProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct 
} from '../controllers/product.controller.js';

const router = express.Router();

// Get all products
router.get('/', getAllProduct);

// Get a single product
router.get('/:id', getSingleProduct);

// Create a new product
router.post('/', createProduct);

// Update a product
router.patch('/:id', updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

export default router;

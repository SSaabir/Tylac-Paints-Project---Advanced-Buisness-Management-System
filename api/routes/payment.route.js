import express from 'express';
import { 
  createPayment, 
  getAllPayment, 
  getSinglePayment, 
  updatePaymentStatus, 
  deletePayment 
} from '../controllers/payment.controller.js';

const router = express.Router();

// Get all payments
router.get('/', getAllPayment);

// Get a single payment by ID
router.get('/:id', getSinglePayment);

// Create a new payment
router.post('/', createPayment);

// Update payment status
router.patch('/:id', updatePaymentStatus);

// Delete a payment record
router.delete('/:id', deletePayment);

export default router;

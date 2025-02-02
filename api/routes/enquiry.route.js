import express from "express";
import { 
    createEnquiry, 
    getAllEnquiry, 
    getSingleEnquiry, 
    updateEnquiry, 
    deleteEnquiry 
} from "../controllers/enquiry.controller.js";

const router = express.Router();

// Get all enquiries
router.get("/", getAllEnquiry);

// Get a single enquiry
router.get("/:id", getSingleEnquiry);

// Create a new enquiry
router.post("/", createEnquiry);

// Update an enquiry (e.g., mark as resolved)
router.patch("/:id", updateEnquiry);

// Delete an enquiry
router.delete("/:id", deleteEnquiry);

export default router;

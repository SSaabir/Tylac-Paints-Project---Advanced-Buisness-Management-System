import express from "express";
import { 
    createFeedback, 
    getAllFeedback, 
    getSingleFeedback, 
    updateFeedback, 
    deleteFeedback 
} from "../controllers/feedback.controller.js";

const router = express.Router();

// Get all feedback
router.get("/", getAllFeedback);

// Get a single feedback
router.get("/:id", getSingleFeedback);

// Create new feedback
router.post("/", createFeedback);

// Update feedback
router.patch("/:id", updateFeedback);

// Delete feedback
router.delete("/:id", deleteFeedback);

export default router;

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import custRoutes from './routes/customer.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

// ✅ Initialize Express first
const app = express();

// ✅ Middleware (before routes)
app.use(express.json());

// Default route for homepage
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// ✅ Routes
app.use('/api/cust', custRoutes);
app.use('/api/auth', authRoutes);

// ✅ Error handling middleware (should be last)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// ✅ Database Connection
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => {
        console.error('MongoDB Connection Error:', err);
    });

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import custRoutes from './routes/customer.route.js';
import authRoutes from './routes/auth.route.js';
import admRoutes from './routes/admin.route.js';
import empRoutes from './routes/employee.route.js';
import enqRoutes from './routes/enquiry.route.js';
import feedRoutes from './routes/feedback.route.js';
import payRoutes from './routes/payment.route.js';
import proRoutes from './routes/product.route.js';
import saleRoutes from './routes/sale.route.js';
import multer from 'multer';
import path from 'path';

dotenv.config();

// ✅ Initialize Express
const app = express();

// ✅ Middleware (before routes)
app.use(express.json());

// ✅ Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: './uploads/', // Directory where files will be stored
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const upload = multer({ storage });

// ✅ Route to Handle File Upload
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    res.status(200).json({ success: true, filePath: `/uploads/${req.file.filename}` });
});

// ✅ Serve Uploaded Files Statically
app.use('/uploads', express.static('uploads'));

// Default route for homepage
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// ✅ Routes
app.use('/api/cust', custRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/adm', admRoutes);
app.use('/api/emp', empRoutes);
app.use('/api/enq', enqRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/pay', payRoutes);
app.use('/api/pro', proRoutes);
app.use('/api/sale', saleRoutes);

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

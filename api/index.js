import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config();

//DB Connect
mongoose.connect(process.env.MONGO).then(() => {
//listens for requests
    app.listen(3000, () => {
    console.log('Server is running on prt 3000');
    })
})
.catch((err) => {console.log(err);}
);

//express app
const app = express();

//middleware
app.use(express.json());

//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})

//routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

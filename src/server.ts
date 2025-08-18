import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // Import helmet

import connectDB from './config/db';
import authRoutes from './routes/auth';

connectDB();

const app = express();

app.use(helmet()); // Use helmet here
app.use(cors());
app.use(express.json());

// Add a simple route for the root URL to handle the 404 error
app.get('/', (req, res) => {
    res.send('API is running successfully!');
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
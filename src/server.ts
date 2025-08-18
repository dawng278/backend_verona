import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import connectDB from './config/db';
import authRoutes from './routes/auth';

connectDB();

const app = express();

app.use(helmet());

// ✅ CORS chỉ cho phép Vercel frontend
app.use(cors({
    origin: "https://frontend-beka-ilaq.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Root route test
app.get('/', (req, res) => {
    res.send('API is running successfully!');
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

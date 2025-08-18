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

// Thêm cấu hình CORS để chỉ cho phép frontend của bạn
const corsOptions = {
    origin: 'https://frontend-beka-ilaq.vercel.app',
    optionsSuccessStatus: 200 // Hỗ trợ trình duyệt cũ
};
app.use(cors(corsOptions));

app.use(express.json());

// Add a simple route for the root URL to handle the 404 error
app.get('/', (req, res) => {
    res.send('API is running successfully!');
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
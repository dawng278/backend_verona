import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // Thêm dòng này để import helmet
import connectDB from './config/db';
import authRoutes from './routes/auth';

connectDB();

const app = express();

// Sử dụng helmet trước các route của bạn để áp dụng các chính sách bảo mật
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
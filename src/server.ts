// backend/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/auth';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

dotenv.config();

(async () => {
    try {
        await connectDB();

        const app = express();

        app.use(cors());
        app.use(express.json());

        app.use('/api/auth', authRoutes);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
})();

app.get('/', (_, res) => res.send('API is running...'));


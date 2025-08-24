import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();

// 🔥 Cho phép frontend gọi API
app.use(
    cors({
    origin: [
        'http://localhost:3000',                          // For local development
        'https://frontend-beka-ilaq.vercel.app',         // Your Vercel frontend
        'https://frontend-beka-ilaq.vercel.app/',        // With trailing slash
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin'
    ],
}));

app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import authRoutes from "./routes/auth";
app.use("/api/auth", authRoutes);

import orderRoutes from "./routes/orderRoutes";
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
    });

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Kết nối đến cơ sở dữ liệu MongoDB.
 * Sử dụng lại kết nối hiện có nếu đã tồn tại để tránh lỗi.
 */
const connectDB = async () => {
    // Kiểm tra nếu đã có kết nối hoặc đang trong quá trình kết nối
    if (mongoose_1.default.connection.readyState >= 1) {
        console.log('MongoDB already connected.');
        return;
    }
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) { // Sử dụng 'any' cho error object vì kiểu của nó có thể không đồng nhất
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Thoát ứng dụng nếu kết nối thất bại
    }
};
exports.default = connectDB;

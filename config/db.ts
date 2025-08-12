import mongoose from 'mongoose';

/**
 * Kết nối đến cơ sở dữ liệu MongoDB.
 * Sử dụng lại kết nối hiện có nếu đã tồn tại để tránh lỗi.
 */
const connectDB = async (): Promise<void> => {
    // Kiểm tra nếu đã có kết nối hoặc đang trong quá trình kết nối
    if (mongoose.connection.readyState >= 1) {
        console.log('MongoDB already connected.');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) { // Sử dụng 'any' cho error object vì kiểu của nó có thể không đồng nhất
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Thoát ứng dụng nếu kết nối thất bại
    }
};

export default connectDB;

// backend/models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            productId: String,
            name: String,
            image: String,
            price: Number,
            quantity: Number,
        },
    ],
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: {
        type: String,
        enum: ["pending", "paid", "shipped", "completed", "cancelled"], // ✅ có cancelled
        default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", OrderSchema);

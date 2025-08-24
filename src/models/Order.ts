// backend/src/models/Order.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
    user: string; // userId tham chiếu tới User
    items: { productId: string; quantity: number }[];
    total: number;
    status: "pending" | "completed" | "cancelled";
    createdAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema(
    {
        user: { type: String, required: true },
        items: [
            {
                productId: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
            },
        ],
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export const Order =
    mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

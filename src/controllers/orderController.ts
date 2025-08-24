// backend/src/controllers/orderController.ts
import { Request, Response } from "express";
import Order from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { userId, items, total ,address, phone, paymentMethod} = req.body;

        if (!userId || !items || !total || !address || !phone || !paymentMethod) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newOrder = new Order({
            userId,
            items,
            totalAmount: total,
            address,
            phone,
            paymentMethod,
        });

        await newOrder.save();

        res.status(201).json({ message: "Order created", order: newOrder });
    } catch (error: any) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ error: error.message });
    }
};

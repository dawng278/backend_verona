// backend/src/controllers/orderController.ts
import { Request, Response } from "express";
import {Order} from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { userId, items, total } = req.body;

        const newOrder = new Order({
            userId,
            items,
            total,
            status: "pending",
        });

        await newOrder.save();

        res.status(201).json({ message: "Order created", order: newOrder });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

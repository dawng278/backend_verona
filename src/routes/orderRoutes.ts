import { Router, Request, Response } from "express";
import { Order } from "../models/Order";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { userId, items, total } = req.body;

        if (!userId || !items || !total) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const order = await Order.create({ user: userId, items, total });
        res.status(201).json(order);
    } catch (err) {
        console.error("❌ Error creating order:", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;

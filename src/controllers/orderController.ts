// In your orderController.ts file
import { Request, Response } from 'express';
import Order from "../models/Order.js";

export const createOrder = async (req: Request, res: Response) => {
    try {
        console.log("🎯 Create order request received");
        console.log("📦 Request body:", req.body);
        console.log("👤 Request headers:", req.headers);

        const { userId, items, total, address, phone, paymentMethod } = req.body;

        // Validate required fields
        if (!userId) {
            console.error("❌ Missing userId");
            return res.status(400).json({
                success: false,
                error: "userId là bắt buộc"
            });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            console.error("❌ Invalid items:", items);
            return res.status(400).json({
                success: false,
                error: "Giỏ hàng trống hoặc không hợp lệ"
            });
        }

        if (!address || !phone || !paymentMethod) {
            console.error("❌ Missing required fields:", { address, phone, paymentMethod });
            return res.status(400).json({
                success: false,
                error: "Vui lòng điền đầy đủ thông tin giao hàng"
            });
        }

        if (!total || total <= 0) {
            console.error("❌ Invalid total:", total);
            return res.status(400).json({
                success: false,
                error: "Tổng tiền không hợp lệ"
            });
        }

        // Create the order
        const newOrder = new Order({
            userId,
            items,
            totalAmount: total,
            address,
            phone,
            paymentMethod,
            status: "pending",
            createdAt: new Date()
        });

        console.log("💾 Attempting to save order:", newOrder);

        const savedOrder = await newOrder.save();
        console.log("✅ Order saved successfully:", savedOrder._id);

        res.status(201).json({
            success: true,
            message: "Đơn hàng được tạo thành công",
            order: savedOrder
        });

    } catch (error) {
        console.error("💥 Error in createOrder:", error);

        // Type-safe error handling
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        res.status(500).json({
            success: false,
            error: "Lỗi tạo đơn hàng: " + errorMessage
        });
    }
};
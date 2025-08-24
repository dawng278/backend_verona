import express from "express";
import { createOrder } from "../controllers/orderController"; // import hàm
import Order from "../models/Order";

const router = express.Router();

// **Add a general GET route for /api/orders**
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, error: "Lỗi lấy danh sách đơn hàng" });
    }
});

// Lấy lịch sử đơn hàng theo user
router.get("/user/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, error: "Lỗi lấy lịch sử đơn hàng" });
    }
});

// Huỷ đơn hàng
router.patch("/:id/cancel", async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: "cancelled" },
            { new: true }
        );
        if (!order) return res.status(404).json({ success: false, error: "Không tìm thấy đơn hàng" });

        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, error: "Hủy đơn thất bại" });
    }
});

// Tạo đơn hàng
router.post("/", createOrder);

export default router;
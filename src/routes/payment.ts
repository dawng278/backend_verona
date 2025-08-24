import express, { Request, Response } from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/payment", async (req: Request, res: Response) => {
    try {
        const { email, amount, orderId } = req.body as {
            email: string;
            amount: number;
            orderId: string;
        };

        if (!email || !amount || !orderId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // cấu hình SMTP (Gmail example)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Verona Pizza" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Xác nhận thanh toán đơn hàng",
            text: `Đơn hàng #${orderId} đã được thanh toán thành công. Số tiền: ${amount} VND.`,
        });

        res.status(200).json({ message: "Payment confirmation email sent" });
    } catch (error) {
        console.error("❌ Payment error:", error);
        res.status(500).json({ error: "Failed to send payment email" });
    }
});

export default router;

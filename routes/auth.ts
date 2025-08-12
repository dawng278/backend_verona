import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

// Đăng nhập
router.post('/login', login);

// Đăng ký
router.post('/register', register);

export default router;

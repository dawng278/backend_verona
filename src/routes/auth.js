"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_js_1 = require("../controllers/authController.js");
const router = express_1.default.Router();
// Đăng nhập
router.post('/login', authController_js_1.login);
// Đăng ký
router.post('/register', authController_js_1.register);
exports.default = router;

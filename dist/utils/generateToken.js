"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Tạo JSON Web Token (JWT) cho người dùng.
 * @param id ID của người dùng.
 * @returns Chuỗi JWT.
 */
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token hết hạn sau 1 giờ
    });
};
exports.default = generateToken;

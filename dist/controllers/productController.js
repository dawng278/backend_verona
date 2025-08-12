"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getAllProducts = void 0;
// lib/backend/controllers/productController.ts
const Product_1 = __importDefault(require("../models/Product"));
const getAllProducts = async () => {
    return await Product_1.default.find();
};
exports.getAllProducts = getAllProducts;
const createProduct = async (data) => {
    const product = new Product_1.default(data);
    return await product.save();
};
exports.createProduct = createProduct;

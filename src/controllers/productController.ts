// lib/backend/controllers/productController.ts
import Product from '../models/Product';
import { ProductInput } from '../types/product';

export const getAllProducts = async () => {
    return await Product.find();
};

export const createProduct = async (data: ProductInput) => {
    const product = new Product(data);
    return await product.save();
};

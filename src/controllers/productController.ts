import Product, { IProduct } from "../models/Product";

export const getAllProducts = async (): Promise<IProduct[]> => {
    return await Product.find();
};

export const createProduct = async (data: IProduct): Promise<IProduct> => {
    const product = new Product(data);
    return await product.save();
};

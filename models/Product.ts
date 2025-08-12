// lib/backend/models/Product.ts
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    description: { type: String },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

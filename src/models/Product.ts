import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    name: string;
    image: string;
    price: number;
    category?: string;
    description?: string;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    description: { type: String },
});

export default mongoose.models.Product ||
mongoose.model<IProduct>("Product", ProductSchema);

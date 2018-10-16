import { model, Document, Schema } from 'mongoose';
import { Truck } from '../models/truck';

export type OrderModel = Document & {
    price: number,
    trucks: Truck[],
};
    
const orderSchema = new Schema({
    price: Number,
    trucks: Array,
}, { timestamps: true });

export default model("Order", orderSchema);
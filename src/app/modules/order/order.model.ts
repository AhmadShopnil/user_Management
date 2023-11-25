import { Schema, model } from 'mongoose';
import { Order } from './order.interface';

const orderSchema = new Schema<Order>({
  productName: {
    type: String,
    required: [true, 'productName is must Required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'price is must Required'],
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is must Required'],
  },
});

export const OrderModel = model<Order>('Order', orderSchema);

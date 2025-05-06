import mongoose from 'mongoose';

import { ISale, IProduct, IPayment } from '../interfaces/sale.interface';

const productSchema = new mongoose.Schema<IProduct>(
  {
    productId: { type: String, required: true },
    saleId: { type: String, required: true },
    clientId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

const PaymentSchema = new mongoose.Schema<IPayment>(
  {
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const saleSchema = new mongoose.Schema<ISale>(
  {
    saleId: { type: String, required: true, unique: true },
    clientId: { type: String, required: true },
    usersId: { type: [String], required: true },
    products: { type: [String], required: true },
    totalAmount: { type: Number, required: true },
    actualAmount: { type: Number, required: true },
    payments: { type: [String] },
    status: { type: String, default: 'pending' },
    coments: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
export const Product = mongoose.model<IProduct>('Product', productSchema);
export const Sale = mongoose.model<ISale>('Sale', saleSchema);

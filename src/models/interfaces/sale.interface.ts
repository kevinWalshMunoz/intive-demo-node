export interface IProduct {
  productId: string;
  saleId: string;
  clientId: string;
  name: string;
  description: string;
  price: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductWithClientName extends IProduct {
  clientName?: string;
}

export interface IPayment {
  paymentId: string;
  amount: number;
  paymentMethod: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductsByStatus {
  pendingForBuy: Array<IProduct>;
  buyed: Array<IProduct>;
  pendingForArrival: Array<IProduct>;
  pendingForDelivery: Array<IProduct>;
}

export interface ISale {
  saleId: string;
  clientId: string;
  usersId: Array<string>;
  products: Array<string>;
  totalAmount: number;
  actualAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
  payments?: Array<string>;
  status: string;
  coments: string;
}

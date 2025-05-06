import { injectable, inject } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { ISale } from '../models/interfaces/sale.interface';
import { Sale } from '../models/DB-schemas/sale.schema';
import { ProductService } from './product.service';
import { PaymentService } from './payment.service';

@injectable()
export class SaleService {
  constructor(
    @inject(ProductService) private productService: ProductService,
    @inject(PaymentService) private paymentService: PaymentService,
  ) { }

  async createSale(saleData: any) {
    try {
      const saleId = uuidv4();
      const products = await this.productService.createProduct(saleData.products, saleId, saleData.clientId);
      const productsIds = products && products.map((product: any) => product.productId);
      const payments = await this.paymentService.createPayment(saleData.payments);
      const paymentId = payments ? [payments.paymentId] : undefined;
      const calculatedActualAmount = saleData.totalAmount - ( payments ? payments?.amount : 0 );
      if (!productsIds) {
        throw new Error('Error creating products or payments');
      }
      const newSale: ISale = {
          saleId: saleId,
          clientId: saleData.clientId,
          usersId: saleData.usersId,
          products: productsIds,
          payments: paymentId,
          status: saleData.status,
          totalAmount: saleData.totalAmount,
          actualAmount: calculatedActualAmount,
          coments: saleData.coments,
      }

      const sale = new Sale(newSale);
      await sale.save();

      return sale;
    } catch (error: unknown) {
      throw error;
    }
  }

  async getSales() {
    try {
      const salesAllData = [];
      const sales = await Sale.find();
      if (!sales) {
        throw new Error('No sales found');
      }
      for (const sale of sales) {
        let payments;
        if (sale.payments) {
          payments = await this.paymentService.getPaymentsByIds(sale.payments);
        }
        const products = await this.productService.getProductsByIds(sale.products);
        const saleData = {
          ...sale.toObject(),
          products,
          payments,
        };
        salesAllData.push(saleData);
      }

      return salesAllData;
    } catch (error: unknown) {
      throw error;
    }
  }
}

import { injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { Payment } from '../models/DB-schemas/sale.schema';


@injectable()
export class PaymentService {

    async createPayment(payment: any) {
      try {
        if (payment.amount) {
          payment.paymentId = uuidv4();
          const newPayment = new Payment(payment);
          await newPayment.save();
          return newPayment;
        }
        return;
      } catch (error: unknown) {
        throw error;
      }
    }

    async getPaymentsByIds(paymentsIds: string[]) {
      try {
        if (paymentsIds) {
          const payments = await Payment.find({ paymentId: { $in: paymentsIds } });
          return payments;
        }
        return;
      } catch (error: unknown) {
        throw error;
      }
    }
}
import { Request, Response } from 'express';
import { inject, autoInjectable } from 'tsyringe';

import { SaleService } from '../services/sale.service';

@autoInjectable()
export class SaleController {
  constructor(@inject(SaleService) private saleService: SaleService) { }

  createSale = async (req: Request, res: Response): Promise<void> => {
    try {
      const sale: any = req.body;
      const newSale = await this.saleService.createSale(sale);
      res.status(201).json(newSale);
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  getSales = async (req: Request, res: Response): Promise<void> => {
    try {
      const sales = await this.saleService.getSales();
      res.status(200).json(sales);
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  private handleError = (error: unknown, res: Response): void => {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: number }).code === 11000
    ) {
      console.log('Duplicate key error');
      res.status(400).json('Duplicate key error');
      return;
    }
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.log('🚀 ~ SaleController ~ error:', errorMessage);
    res.status(500).json({ error: errorMessage });
  };
}

import { Router } from 'express';
import { inject, autoInjectable } from 'tsyringe';

import { SaleController } from '../controllers/sale.controller';

@autoInjectable()
export class SaleRouter {

  public router: Router;

  constructor(@inject(SaleController) private saleController: SaleController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.saleController.createSale);
    this.router.get('/', this.saleController.getSales);
  }
}

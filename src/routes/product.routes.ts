import { Router } from 'express';
import { inject, autoInjectable } from 'tsyringe';

import { ProductController } from '../controllers/product.controller';

@autoInjectable()
export class ProductRouter {

  public router: Router;

  constructor(@inject(ProductController) private productController: ProductController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/get-products-by-status', this.productController.getProductsByStatus);
    this.router.get('/get-products', this.productController.getProducts);
    this.router.put('/update-product/:productId', this.productController.updateProduct);
  }
}

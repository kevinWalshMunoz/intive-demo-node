import { Request, Response } from 'express';
import { inject, autoInjectable } from 'tsyringe';

import { ProductService } from '../services/product.service';

@autoInjectable()
export class ProductController {
  constructor(@inject(ProductService) private productService: ProductService) { }

  getProductsByStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      let filters: string[] | undefined;
      const queryFilters = req.query.filters;

      if (typeof queryFilters === 'string') {
        filters = [queryFilters];
      } else if (Array.isArray(queryFilters) && queryFilters.every(item => typeof item === 'string')) {
        filters = queryFilters as string[];
      }
      const products = await this.productService.getProductsByStatus(filters);
      res.status(200).json(products);
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      let filters: string[] | undefined;
      const queryFilters = req.query.filters;

      if (typeof queryFilters === 'string') {
        filters = [queryFilters];
      } else if (Array.isArray(queryFilters) && queryFilters.every(item => typeof item === 'string')) {
        filters = queryFilters as string[];
      }
      const products = await this.productService.getProducts(filters);
      res.status(200).json(products);
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { productId } = req.params;
      const updateData = req.body;
      const updatedProduct = await this.productService.updateProduct(productId, updateData);
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      }
      else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  private handleError = (error: unknown, res: Response): void => {
    // Basic error handling, adjust as needed
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('Error in ProductController:', error);
    res.status(500).json({ error: errorMessage });
  };
}

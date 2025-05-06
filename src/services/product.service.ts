import { injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { Product } from '../models/DB-schemas/sale.schema';
import { Client } from '../models/DB-schemas/client.schema';
import { IProductsByStatus, IProductWithClientName } from '../models/interfaces/sale.interface';

@injectable()
export class ProductService {

    async createProduct(products: [], saleId: string, clientId: string) {
      try {
        if (products) {
          const savedProducts = await Promise.all(
            products.map(async (product:any) => {
              product.productId = uuidv4();
              product.saleId = saleId;
              product.clientId = clientId;
              const newProduct = new Product(product);
              await newProduct.save();
              return newProduct;
            })
          );
          return savedProducts;
        }
        return;
      } catch (error: unknown) {
        throw error;
      }
    }

    async getProductsByStatus(filters?: string[]) {
      try {
        const productsByStatus: IProductsByStatus = {
          pendingForBuy: [],
          buyed: [],
          pendingForArrival: [],
          pendingForDelivery: []
        }


        const query = (filters && filters.length > 0) ? { status: { $in: filters } } : {};
        
        const products = await Product.find(query);

        for (const product of products) {
          if (product.status && productsByStatus.hasOwnProperty(product.status)) {
            (productsByStatus as any)[product.status].push(product);
          }
        }

        return productsByStatus;
      } catch (error: unknown) {
        throw error;
      }
    }

    async getProducts(filters?: string[]) {
      try {
        const query = (filters && filters.length > 0) ? { status: { $in: filters } } : {};
        const products = await Product.find(query);
        
        const productsWithClientName = await Promise.all(
          products.map(async (product) => {
            const productObj = product.toObject();
            if (product.clientId) {
              const client = await Client.findOne({ clientId: product.clientId });
              if (client) {
                (productObj as IProductWithClientName).clientName = client.name;
              }
            }
            return productObj as IProductWithClientName;
          })
        );
        
        return productsWithClientName;
      } catch (error: unknown) {
        throw error;
      }
    }

    async getProductsByIds(productsIds: string[]) {
      try {
        if (productsIds) {
          const products = await Product.find({ productId: { $in: productsIds } });

          const enrichedProducts = await Promise.all(
            products.map(async (product) => {
              const productObj = product.toObject();
              if (product.clientId) {
                const client = await Client.findOne({ clientId: product.clientId });
                if (client) {
                  (productObj as IProductWithClientName).clientName = client.name;
                }
              }
              return productObj as IProductWithClientName;
            })
          );
          
          return enrichedProducts;
        }
        return;
      } catch (error: unknown) {
        throw error;
      }
    }

    async updateProduct(productId: string, product: any) {
      try {
        const updatedProduct = await Product.findOneAndUpdate(
          { productId },
          { $set: product },
          { new: true }
        );
        return updatedProduct;
      } catch (error: unknown) {
        throw error;
      }
    }
}
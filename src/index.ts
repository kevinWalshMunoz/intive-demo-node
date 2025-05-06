import 'reflect-metadata';

import express from 'express';
import dotenv from 'dotenv';
import redoc from 'redoc-express';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import { container } from 'tsyringe';
import mongoose from 'mongoose';
import cors from 'cors';

import { UserRouter } from './routes/user.routes';
import { ClientRouter } from './routes/client.routes';
import { SaleRouter } from './routes/sale.routes';
import { ProductRouter } from './routes/product.routes';

dotenv.config();

class WebServer {
  private _app: express.Application;
  private _mongoDBUri = process.env.DATABASE_URL || '';

  constructor() {
    this._app = express();
    this._app.use(cors());
    this.setServerOptions();
    this.createRoutes();
    this.startServer();
    this.createDocsAndSwagger();
    this.connectToDatabase();
  }

  private setServerOptions(): void {
    dotenv.config();
    this._app.use(express.text());
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: false }));
  }

  private createRoutes(): void {
    const userRouter = container.resolve(UserRouter);
    const clientRouter = container.resolve(ClientRouter);
    const saleRouter = container.resolve(SaleRouter);
    const productRouter = container.resolve(ProductRouter);

    this._app.use('/api/user', userRouter.router);
    this._app.use('/api/client', clientRouter.router);
    this._app.use('/api/sale', saleRouter.router);
    this._app.use('/api/product', productRouter.router);

    this._app.get('/api/ping', (req, res) => {
      res.status(200).json({ message: 'pong' });
    });
  }

  private startServer(): void {
    const PORT = process.env.PORT || 3000;
    this._app.listen(PORT, () => {
      console.log(`Server is running on ${process.env.BASE_URL}`);
    });
  }

  private createDocsAndSwagger(): void {
    let openapiYaml = fs.readFileSync('./openapi.yaml', 'utf8');
    openapiYaml = openapiYaml.replace('${API_BASE_URL}', process.env.BASE_URL || '');

    this._app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(undefined, {
      swaggerOptions: { url: `${process.env.BASE_URL}/openapi.yaml` }
    }));

    this._app.get('/openapi.yaml', (req, res) => {
      res.type('text/yaml').send(openapiYaml);
    });

    this._app.get('/docs', redoc({ title: 'API Docs', specUrl: '/openapi.yaml' }));
  }

  private async connectToDatabase(): Promise<void> {
    try {
      await mongoose.connect(this._mongoDBUri);
      console.log('MongoDB Connected');
    } catch (error) {
      console.error('MongoDB Connection Error:', error);
      process.exit(1);
    }
  }
}

const server = new WebServer();

import { Router } from 'express';
import { inject, autoInjectable } from 'tsyringe';

import { ClientController } from '../controllers/client.controller';

@autoInjectable()
export class ClientRouter {

  public router: Router;

  constructor(@inject(ClientController) private clientController: ClientController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/:clientId', this.clientController.getClientById);
    this.router.get('/', this.clientController.getAllClients);
    this.router.post('/', this.clientController.createClient);
    this.router.put('/:clientId', this.clientController.updateClient);
    this.router.delete('/:clientId', this.clientController.deleteClient);
  }
}

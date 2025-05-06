import { Request, Response } from 'express';
import { inject, autoInjectable } from 'tsyringe';

import { ClientService } from '../services/client.service';
import { INewClientRequest } from '../models/requests/client.interface';

@autoInjectable()
export class ClientController {
  constructor(@inject(ClientService) private clientService: ClientService) { }

  createClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const client: INewClientRequest = req.body;
      const newClient = await this.clientService.createClient(client);
      res.status(201).json(newClient);
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  getAllClients = async (_req: Request, res: Response): Promise<void> => {
    try {
      const clients = await this.clientService.getAllClients();
      res.status(200).json(clients);
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  getClientById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { clientId } = req.params;
      const client = await this.clientService.getClientById(clientId);
      if (!client) {
        res.status(404).json({ message: 'Client not found' });
        return;
      }
      res.status(200).json(client);
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  updateClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const { clientId } = req.params;
      const updatedData: Partial<INewClientRequest> = req.body;
      const updatedClient = await this.clientService.updateClientById(clientId, updatedData);
      if (!updatedClient) {
        res.status(404).json({ message: 'Client not found' });
        return;
      }
      res.status(200).json(updatedClient);
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  deleteClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const { clientId } = req.params;
      const deletedClient = await this.clientService.deleteClientById(clientId);
      if (!deletedClient) {
        res.status(404).json({ message: 'Client not found' });
        return;
      }
      res.status(200).json({ message: 'Client deleted successfully' });
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
    console.log('🚀 ~ ClientController ~ error:', errorMessage);
    res.status(500).json({ error: errorMessage });
  };
}

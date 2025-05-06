import { injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { Client } from '../models/DB-schemas/client.schema';
import { INewClientRequest } from '../models/requests/client.interface';

@injectable()
export class ClientService {

  async createClient(clientData: any) {
    try {
      const clientId = uuidv4();
      const client = new Client({ ...clientData, clientId });
      await client.save();
      return client;
    } catch (error: unknown) {
      throw error;
    }
  }

  async getAllClients() {
    try {
      const clients = await Client.find();
      return clients;
    } catch (error: unknown) {
      throw error;
    }
  }

  async getClientById(clientId: string) {
    try {
      const client = await Client.findOne({ clientId });
      return client;
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateClientById(clientId: string, updateData: Partial<INewClientRequest>) {
    try {
      const client = await Client.findOneAndUpdate({ clientId }, updateData, { new: true });
      return client;
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteClientById(clientId: string) {
    try {
      const client = await Client.findOneAndDelete({ clientId });
      return client;
    } catch (error: unknown) {
      throw error;
    }
  }
}

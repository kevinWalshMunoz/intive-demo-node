import mongoose from 'mongoose';
import { IClient } from '../interfaces/client.interface';

const clientSchema = new mongoose.Schema<IClient>({
  clientId: { type: String, required: true },
  name: { type: String, required: true },
  telephone: { type: String, required: true },
});

export const Client = mongoose.model<IClient>('Client', clientSchema);

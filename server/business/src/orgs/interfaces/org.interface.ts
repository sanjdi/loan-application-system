import { Document } from 'mongoose';

export interface Org extends Document {
  readonly name: string;
  readonly founded: string;
  readonly owner_id?: string;
}
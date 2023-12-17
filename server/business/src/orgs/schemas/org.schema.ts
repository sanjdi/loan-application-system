/* import * as mongoose from 'mongoose';

export const OrgSchema = new mongoose.Schema({
  name: String,
  founded: String,
  owner_id: String,
}); */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrgDocument = HydratedDocument<Org>;

@Schema()
export class Org {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const OrgSchema = SchemaFactory.createForClass(Org);
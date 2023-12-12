import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
  name: String,
  founded: String,
  owner_id: String,
});
import * as mongoose from 'mongoose';

export const LoanSchema = new mongoose.Schema({
  companyName: String,
  amount: Number,
  status: String,
  dateApplied: Date,
  approvedAmount: Number
});

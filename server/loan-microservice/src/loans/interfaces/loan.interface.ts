import { Document } from 'mongoose';

export interface Loan extends Document {
  readonly companyName: string;
  readonly amount: number;
  status?: string;
  approvedAmount?: number;
  readonly dateApplied?: string;
}

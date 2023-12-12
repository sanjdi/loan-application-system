import { Mongoose } from 'mongoose';
import { LoanSchema } from './schemas/loan.schema';

export const loansProviders = [
  {
    provide: 'LOAN_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Loan', LoanSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
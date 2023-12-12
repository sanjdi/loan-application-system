import { Mongoose } from 'mongoose';
import { CompanySchema } from './schemas/company.schema';

export const companyProviders = [
  {
    provide: 'COMPANY_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Company', CompanySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
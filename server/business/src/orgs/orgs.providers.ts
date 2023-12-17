import { Mongoose } from 'mongoose';
import { OrgSchema } from './schemas/org.schema';

export const orgProviders = [
  {
    provide: 'ORG_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Org', OrgSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
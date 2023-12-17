import { Mongoose } from 'mongoose';
import { ApplicationSchema } from './schemas/application.schema';

export const applicationProviders = [
  {
    provide: 'APPLICATION_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Application', ApplicationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
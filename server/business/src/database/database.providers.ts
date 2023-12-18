import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://localhost:27017/orgsdb'),
      //await mongoose.connect('mongodb://mongo:27017/orgsdb'),
  },
];
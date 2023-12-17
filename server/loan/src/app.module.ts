import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationController } from './applications/applications.controller';
import { ApplicationService } from './applications/applications.service';
import { ApplicationModule } from './applications/applications.module';
import { AccountingProvidersModule } from './accounting-providers/accounting-providers.module';

/* @Module({
  imports: [OrgModule],
  controllers: [OrgController],
  providers: [OrgService],
})
@Module({
  //  imports: [MongooseModule.forRoot(process.env.MONGO_DSN)],
  //  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/orgdb')],
  imports: MongooseModule.forRootAsync({
    useFactory: () => ({ uri: 'mongodb://localhost:27017/orgdb' }),
  }),
})
export class AppModule {} */

@Module({
  imports: [ApplicationModule, AccountingProvidersModule],
})
export class AppModule {} 

/*
@Module({
  imports: [MongooseModule.forRoot('mongodb://db:27017/orgdb')],
})
export class AppModule {} */
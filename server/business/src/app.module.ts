import { DynamicModule, Module } from '@nestjs/common';
import { OrgModule } from './orgs/orgs.module';
import { OrgController } from './orgs/orgs.controller';
import { OrgService } from './orgs/orgs.service';
import { MongooseModule } from '@nestjs/mongoose';

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
  imports: [OrgModule],
})
export class AppModule {} 

/*
@Module({
  imports: [MongooseModule.forRoot('mongodb://db:27017/orgdb')],
})
export class AppModule {} */
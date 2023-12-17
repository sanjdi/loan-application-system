import { Module } from '@nestjs/common';
import { OrgController } from './orgs.controller';
import { OrgService } from './orgs.service';
import { orgProviders } from './orgs.providers';
import { Org, OrgSchema } from './schemas/org.schema';
import { MongooseModule } from '@nestjs/mongoose';

/* @Module({
  controllers: [OrgController],
  providers: [OrgService, ...orgProviders],
  exports: [OrgService]
})
@Module({
  imports: [MongooseModule.forFeature([{ name: Org.name, schema: OrgSchema }])],
  controllers: [OrgController],
  providers: [OrgService],
})
export class OrgModule {} */

import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrgController],
  providers: [OrgService, ...orgProviders],
  exports: [OrgService]
})
export class OrgModule {}
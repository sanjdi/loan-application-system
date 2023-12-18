import { Module } from '@nestjs/common';
import { OrgModule } from './orgs/orgs.module';

@Module({
  imports: [OrgModule],
})
export class AppModule {} 

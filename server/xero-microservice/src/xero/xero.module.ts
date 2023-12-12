import { Module } from '@nestjs/common';
import { XeroController } from './xero.controller';
import { XeroService } from './xero.service';

@Module({
  controllers: [XeroController],
  providers: [XeroService]
})
export class XeroModule {}

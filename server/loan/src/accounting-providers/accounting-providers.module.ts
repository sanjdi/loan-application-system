import { Module } from '@nestjs/common';
import { AccountingProvidersController } from './accounting-providers.controller';
import { AccountingProvidersService } from './accounting-providers.service';
import { XeroService } from './xero.service';
import { MyobService } from './myob.service';

@Module({
  controllers: [AccountingProvidersController],
  providers: [AccountingProvidersService, XeroService, MyobService],
})
export class AccountingProvidersModule {}
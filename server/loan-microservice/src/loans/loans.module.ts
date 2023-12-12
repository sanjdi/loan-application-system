import { Module } from '@nestjs/common';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';
import { loansProviders } from './loans.providers';
import { DatabaseModule } from '../database/database.module';
import { CompanyModule } from 'src/company/company.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AccountingProvidersService } from 'src/accounting-providers/accounting-providers.service';

@Module({
  imports: [DatabaseModule, CompanyModule, HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }),],
  controllers: [LoansController],
  providers: [LoansService, AccountingProvidersService, ...loansProviders],
})
export class LoansModule {}

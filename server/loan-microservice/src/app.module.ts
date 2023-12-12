import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { AccountingProvidersModule } from './accounting-providers/accounting-providers.module';
import { LoansModule } from './loans/Loans.module';

@Module({
  imports: [UsersModule, CompanyModule, AccountingProvidersModule, LoansModule],
})
export class AppModule {}

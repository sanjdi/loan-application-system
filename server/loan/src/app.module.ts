import { Module } from '@nestjs/common';
import { ApplicationModule } from './applications/applications.module';
import { AccountingProvidersModule } from './accounting-providers/accounting-providers.module';

@Module({
  imports: [ApplicationModule, AccountingProvidersModule],
})
export class AppModule {} 

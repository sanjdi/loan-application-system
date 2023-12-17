import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BusinessController } from './business.controller';
import { LoanApplicationsController } from './loan-applications.controller';
import { AccountingProvidersController } from './accounting-providers.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BUSINESS_SERVICE',
        transport: Transport.TCP, 
        options: {
          host: 'localhost', //'business',
          port: 8888,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'LOANS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost', //'loans',
          port: 8889,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'ACCOUNTING_PROVIDERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost', //'loans',
          port: 8889,
        },
      },
    ]),
  ],
  controllers: [BusinessController, LoanApplicationsController, AccountingProvidersController],
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AccountingProvidersController } from './accounting-providers.controller';
import { AccountingProvidersService } from './accounting-providers.service';

/* @Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  exports: [AccountingProvidersService],
  controllers: [AccountingProvidersController],
  providers: [AccountingProvidersService],
}) */

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AccountingProvidersController],
  providers: [AccountingProvidersService,
    {
      provide: 'ACCOUNTING_PROVIDER_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('XERO_ACCOUNTING_PROVIDER_HOST'),
            port: configService.get('XERO_ACCOUNTING_PROVIDER_PORT'),
          },
        }),
    },
  ],
})
export class AccountingProvidersModule {}
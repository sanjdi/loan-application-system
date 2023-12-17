import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ServiceAccountingProvidersSearchResponse } from './interfaces/accounting-providers/service-accounting-providers-search-response.interface';
import { ServiceAccountingProvidersGetBalanceSheetResponse } from './interfaces/accounting-providers/service-accounting-providers-get-balance-sheet-response.interface';

@Controller('accounting-providers')
export class AccountingProvidersController {
  constructor(
    @Inject('ACCOUNTING_PROVIDERS_SERVICE')
    private readonly accountingProvidersServiceClient: ClientProxy,
  ) {}

  @Get()
  async getAccountingProviders() {
    console.log(`gateway >> getAccountingProviders()`);
    const response: ServiceAccountingProvidersSearchResponse =
      await firstValueFrom(
        this.accountingProvidersServiceClient.send(
          'get_accounting_providers',
          {},
        ),
      );

    console.log(`gateway >> getAccountingProviders() | response=${JSON.stringify(response)}`);

    return {
      message: response.message,
      data: {
        accountingProviders: response,
      },
      errors: null,
    };
  }

  @Get(':provider/:companyId')
  async getBalanceSheet(
    @Param('provider') provider: string,
    @Param('companyId') companyId: string,
  ) {
    const response: ServiceAccountingProvidersGetBalanceSheetResponse =
      await firstValueFrom(
        this.accountingProvidersServiceClient.send('get_balance_sheet', {
          provider: provider,
          companyId: companyId,
        }),
      );

    return {
      message: response.message,
      data: {
        balanceSheet: response,
      },
      errors: null,
    };
  }
}
